
new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        dailyWC: 1,
        wordcounts: null,
        // v-model to the textarea in html
        textArea: "",
        totalWord: 0, // A list with each word as a string
        // TODO: Later become a user-submitted value
        dailyGoal: 130,
        progress: 1,
        csrfToken: null,
        projectName: '',
    },
    mounted() {
        this.getWc(), // Testing that the get is working
        this.csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value
    },
    methods: {
        countText() {
            // Determining what counts as a word based on regex
            this.totalWord = this.textArea.match(/[\w\d\’\'-]+/gi);
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
                // doesn't include date here because it is set to default atetime.date.today in models
            }, {
                headers: { 'X-CSRFToken': this.csrfToken }
            }).then(res => this.getWc())
        } 
    },
    computed: {
        calcProgress() {
            // Calculates percentage of your progress toward goal
            this.progress = Math.round(this.dailyWC/this.dailyGoal*100)
            return this.progress
        }
    }
})