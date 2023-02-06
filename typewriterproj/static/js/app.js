new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        // projectId: 1, // Where did this come from?
        
        projectData: null,
        projectName: null,
        ProjectStartDate: null,
        ProjectEndDate: null,
        projectWcGoal: 0,

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
        accessedToday: false, // This is already set to False as default in the Models.py
    },
    mounted() {
        this.username = document.querySelector('input[name=userid]').value // retrieving the primary key
        this.csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value
        this.getProj()
        this.getWc()
    },
    methods: {
        countText() {
            this.totalWord = this.textArea.match(/[\w\d\’\'-]+/gi); // Determining what counts as a word based on regex
            // TOOD: to add in error handling for value that is less than 1
            // length of totalCharacter becomes null and this throws type error
            this.dailyWC = this.totalWord.length
        },
        getProj() {
            // This is in case user does not specify a project, we can automatically assign it to this one
            if (this.projectData == null) // This is always true in this instance
                {
                    // This assumes an unassigned project already exists and we are fetching it
                    axios.get('/apis/v1/projects/').then(response => { // This runs AFTER 51-58
                        this.projectData = response.data.find(project => project.name === 'Unassigned')
                        alert(`${JSON.stringify(this.projectData)} This is the projectdata first`) // FOUR
                        alert(`${JSON.stringify(response.data)} This is the response data`)
                        // If it finds something in projectData, then it updates the data
                        if (this.projectData !== undefined) // if this has something in it
                        {
                            alert(`${JSON.stringify(this.projectData)} This is the projectdata second`) // FOUR
                            this.projectName = this.projectData.name
                        }
                        if (this.projectName !== 'Unassigned') {
                            // If we did not find an "Unassigned" project, then make one using addProject()
                            alert(`${this.projectName} is the project name`)
                        }
                    })
                }
        },
        // )} if (this.projectName != 'Unassigned') {
        //     // IT KEEPS RUNNING THIS INSTEAD OF DOING THE GET FIRST
        //     alert(this.projectName)
        //     alert("null")
        //     this.addProject()
        // }
// }},
        addProject() {
            axios.post('/apis/v1/addproject/', { // Does not need payload; automatic values exist already
            }, {
                headers: { 'X-CSRFToken': this.csrfToken }
            }).then(response => {
                this.getWc()
                this.getProj()
            })
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
                        this.projectData = todaysWC[0].project
                        this.projectId = todaysWC[0].project.id
                        this.projectName = todaysWC[0].project.name
                        this.ProjectStartDate = todaysWC[0].project.start_date
                        this.ProjectEndDate = todaysWC[0].project.end_date
                        this.projectWcGoal = todaysWC[0].project.word_count_goal
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
            axios.get(`/apis/v1/${wcId}`).then(response => 
                    {this.textArea = response.data.text_area
                    this.projectId = response.data.project.id
                    this.projectData = response.data.project
                    this.dailyWC = response.data.todays_wc
                    this.todaysDate = response.data.date
                    this.wcId = response.data.id
                    this.dailyGoal = response.data.daily_goal
                    this.dailyGoalComplete = response.data.daily_goal_bool
                    this.projectName = response.data.project.name // This works.
                }
            )
        },
        createUpdate(wcId) {
            // If this is false AND it's today's date.
            // Means you didn't access it today yet and can create a new instance.
            if (!this.accessedToday && this.todaysDate == `${new Date().toLocaleDateString('en-CA')}`) 
            {axios.post('/apis/v1/new/', {
                //'project': this.projectData, // this needs to be more complicated...
                // 'project': {
                //     'name': 'This is a post.',
                //     'start_date': '2023-02-04',
                //     'end_date': '2023-02-04',
                //     'word_count_goal': 400,
                //     'id': 8
                // },
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
                    // 'project': {
                    //     'name': 'This is an update',
                    //     'start_date': '2023-02-04',
                    //     'end_date': '2023-02-04',
                    //     'word_count_goal': 400,
                    //     'id': 5
                    // },
                    'user': this.username,
                    'todays_wc': this.dailyWC, // TODO: refuses to do the thing if wc is 0 (resolving as 1)
                    'text_area': this.textArea,
                    'daily_goal': this.dailyGoal,
                    'daily_goal_bool': this.dailyGoalComplete,
                    'accessed_today': this.accessedToday,
            }, {
                headers: { 'X-CSRFToken': this.csrfToken }
            }).then(res => this.getWc())
            console.log("Was accessed today.")}
        }
    },
    computed: {
        calcProgress() {
            let calcProg = this.dailyWC/this.dailyGoal
            this.progress = Math.round(this.dailyWC/this.dailyGoal*100)
            if (calcProg > this.dailyGoal && this.dailyGoal > 0) {
                this.progress = 100
            } else if (this.progress == 'Infinity') {
                this.progress = 0
            }
            return this.progress
        },
    }
})