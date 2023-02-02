const user = JSON.parse(document.getElementById("userobject"))
console.log(user)

new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        username: '',
        dailyWC: 1,
        todaysDate: `${new Date().toLocaleDateString('en-CA')}`, // 31/01/2023
        wordcounts: null,
        textArea: '', // v-model to the textarea in html
        totalWord: 0, // A list with each word as a string for counting words
        dailyGoal: 0, // User-submitted value v-modeled to html TODO: allow commas?????
        dailyGoalComplete: false,
        progress: 1,
        allWcs: 0,
        csrfToken: null,
        wcId: '', // Change to whatever display button is. And then can be passed into wcUpdate
        projectName: '', // TODO: Later become a user-submitted value
        accessedToday: false, // This is already set to False as default in the Models.py
    },
    mounted() {
        this.getWc()
        this.username = document.querySelector('input[name=userid]').value // retrieving the primary key
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
            // Retrieves a data model based on whatever day you want to view.
            axios.get('/apis/v1').then(response => {
                    this.wordcounts = response.data
                    // When the page mounts, filter down to date that is today's date.
                    let todaysWC = this.wordcounts.filter(wc => wc.date == `${new Date().toLocaleDateString('en-CA')}`)
                    this.allWcs = this.wordcounts.reduce((acc, wordcount) => acc + wordcount.todays_wc, 0);
                    //  If such a thing exists and array isn't empty, update the variables on the page
                    if (todaysWC.length > 0 && this.todaysDate == todaysWC[0].date){ // Other functions also call this function, so to keep this from running and filling all fields with today's text, this conditional checks and makes sure the data is really for the present day.
                        // Assigning the values to populate with the corresponding values.
                        this.wcId = todaysWC[0].id
                        this.wprojectName = todaysWC[0].project_name
                        this.textArea = todaysWC[0].text_area
                        this.dailyWC = todaysWC[0].todays_wc
                        this.dailyGoalComplete = todaysWC[0].daily_goal_bool
                        this.accessedToday = true
                        this.dailyGoal = todaysWC[0].daily_goal
                    }
                })
        },
        wcView(wcId) { // passing wcId in as param
            // More individual than getWC()
            // Populates the page with data corresponding to what is stored in database under the given id
            axios.get(`/apis/v1/${wcId}`).then(
                    response => 
                    {this.textArea = response.data.text_area
                    this.dailyWC = response.data.todays_wc
                    this.todaysDate = response.data.date
                    this.projectName = response.data.project_name
                    this.wcId = response.data.id
                    this.dailyGoal = response.data.daily_goal
                    this.dailyGoalComplete = response.data.daily_goal_bool
                }
            )
        },
        createUpdate(wcId) {
            // If this is false AND it's today's date.
            // Means you didn't access it today yet and can create a new instance.
            if (!this.accessedToday && this.todaysDate == `${new Date().toLocaleDateString('en-CA')}`) 
            {axios.post('/apis/v1/new/', {
                'project_name': this.projectName,
                'todays_wc': this.dailyWC,
                'text_area': this.textArea,
                'date': this.todaysDate,
                'user': this.username,
                'accessed_today': this.accessedToday,
                'daily_goal': this.dailyGoal,
                'daily_goal_bool': this.dailyGoalComplete
                // doesn't include date here because it is set to default datetime.date.today in models
            }, {
                headers: { 'X-CSRFToken': this.csrfToken }
            }).then(response => {
                this.getWc()
            })} else {
                axios.put(`/apis/v1/${wcId}/`, {
                    'user': this.username,
                    'project_name': this.projectName,
                    'todays_wc': this.dailyWC, // TODO: refuses to do the thing if wc is 0 (resolving as 1)
                    'text_area': this.textArea,
                    'daily_goal': this.dailyGoal,
                    'daily_goal_bool': this.dailyGoalComplete
            }, {
                headers: { 'X-CSRFToken': this.csrfToken }
            }).then(res => this.getWc())
            console.log("Was accessed today.")}
        }
    },
    computed: {
        calcProgress() {
            // Calculates percentage of your progress toward goal
            // TODO: add some sort of edgecase handling for if you go OVER the goal
            let calcProg = this.dailyWC/this.dailyGoal
            // console.log(this.dailyWC/this.dailyGoal*100)
            console.log(this.progress)
            this.progress = Math.round(this.dailyWC/this.dailyGoal*100)
            if (calcProg > this.dailyGoal && this.dailyGoal > 0) {
                this.progress = 100
            } else if (this.progress == 'Infinity') {
                this.progress = 0
            }
            return this.progress
        }
    }
})