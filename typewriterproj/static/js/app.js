new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        dailyWC: 1,
        todaysDate: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
        wordcounts: null,
        textArea: '', // v-model to the textarea in html
        totalWord: 0, // A list with each word as a string for counting words
        dailyGoal: 130, // TODO: Later become a user-submitted value
        progress: 1,
        csrfToken: null,
        wcId: '', // Change to whatever display button is. And then can be passed into wcUpdate
        projectName: '', // TODO: Later become a user-submitted value
        accessedToday: false, // This is already set to False as default in the Models.py
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
            axios.get('/apis/v1').then(response => {
                    this.wordcounts = response.data
                    // console.log(this.wordcounts)
                    // When the page mounts, filter down to date that is today's date.
                    let todaysWC = this.wordcounts.filter(wc => wc.date == '2023-01-31') // Hard-coded becaaaauuuse I need to fix the date.
                    // alert(todaysWC)
                    //  If such a thing exists and array isn't empty, update the variables on the page
                    if (todaysWC.length > 0)
                    {
                        // Assigning the values to populate with the corresponding values.
                        this.wcId = todaysWC[0].id
                        this.textArea = todaysWC[0].text_area
                        this.dailyWC = todaysWC[0].todays_wc
                        // alert("Todays wordcount has a length.")
                        this.accessedToday = true
                    }
                })
        },
        wcView(wcId) { // passing wcId in as param
            // Populates the page with data corresponding to what is stored in database under the given id
            axios.get(`/apis/v1/${wcId}`).then(
                    response => 
                    // TODO: add more later (such as project)
                    {this.textArea = response.data.text_area
                    this.dailyWC = response.data.todays_wc
                    this.todaysDate = response.data.date
                    this.wcId = response.data.id
                    console.log(response.data)
                }
            )
        },
        createUpdate(wcId) {
            // If this is false AND it's today's date.
            // Means you didn't access it today yet and can create a new instance.
            if (!this.accessedToday && this.todaysDate == `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`) 
            {axios.post('/apis/v1/new/', {
                'project_name': this.projectName,
                'todays_wc': this.dailyWC,
                'text_area': this.textArea,
                'date': this.todaysDate,
                // doesn't include date here because it is set to default datetime.date.today in models
                // Some edgecase shit with loaded-in page that I need to work on
            }, {
                headers: { 'X-CSRFToken': this.csrfToken }
            }).then(response => {
                this.getWc()
                // console.log(response)
                // console.log("This was clicked.....")
                // console.log(response.data)
            })} else 
            axios.put(`/apis/v1/${wcId}/`, {
                'project_name': this.projectName,
                'todays_wc': this.dailyWC,
                'text_area': this.textArea,
            },
            {
                headers: { 'X-CSRFToken': this.csrfToken }
            }).then(res => this.getWc())
            console.log("Was accessed today ig")
            // axios.post(`/apis/v1/today/`, {
            // API view and url
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