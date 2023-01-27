new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        dailyWC: 1,
        wordcounts: null,
        textArea: '', // v-model to the textarea in html
        totalWord: 0, // A list with each word as a string for counting words
        dailyGoal: 130, // TODO: Later become a user-submitted value
        progress: 1,
        csrfToken: null,
        wcPk: '', // Change to whatever display button is. And then can be passed into wcUpdate
        projectName: '', // TODO: Later become a user-submitted value
    },
    mounted() {
        this.getWc(), // Testing that the get is working
        this.csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value
    },
    methods: {
        countText() {
            this.totalWord = this.textArea.match(/[\w\d\’\'-]+/gi); // Determining what counts as a word based on regex
            // need to add in error handling for value that is less than 1
            // length of totalCharacter becomes null and this throws type error
            this.dailyWC = this.totalWord.length
        },
        getWc() {
            axios.get('/apis/v1').then(response => this.wordcounts = response.data)
        },
        addWc() {
            // If it already exists, update existing one
            axios.post('/apis/v1/new/', {
                'project_name': this.projectName,
                'todays_wc': this.dailyWC,
                'text_area': this.textArea
                // doesn't include date here because it is set to default datetime.date.today in models
            }, {
                headers: { 'X-CSRFToken': this.csrfToken }
            }).then(res => this.getWc())
        },
        wcView(wcId) { // passing wcId in as param
            // Populates the page with data corresponding to what is stored in database under the given id
            axios.get(`/apis/v1/${wcId}`).then(
                    response => 
                    // TODO: add more later (such as project)
                    {this.textArea = response.data.text_area
                    this.dailyWC = response.data.todays_wc
                }
            )
        },
        wcUpdate(wcId) {
            axios.put(`/apis/v1/${wcId}/`, {
                'project_name': this.projectName,
                'todays_wc': this.dailyWC,
                'text_area': this.textArea
            }, 
            {
                headers: { 'X-CSRFToken': this.csrfToken }
            }).then(res => this.getWc())
        }
        //     path('<int:pk>/', WcView.as_view()),
    },
    computed: {
        calcProgress() {
            // Calculates percentage of your progress toward goal
            this.progress = Math.round(this.dailyWC/this.dailyGoal*100)
            return this.progress
        }
    }
})