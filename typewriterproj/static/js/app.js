new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        projectId: null,
        
        projectData: null,
        projects: [],
        selectedProject: null, //This stores the pk of the selected project.
        projectName: null,
        projectStartDate: '',
        projectEndDate: '',
        projectWcGoal: 0,

        newProjectName: null,
        newProjStartDate: null,
        newProjEndDate: null,
        newProjWcGoal: 0,

        username: '',
        csrfToken: null,
        wordcounts: null,
        allWcs: 0,
        dailyWC: 1,
        todaysDate: `${new Date().toLocaleDateString('en-CA')}`, // 31/01/2023
        dailyGoalComplete: false,
        accessedToday: false, // This is already set to False as default in the Models.py
        textArea: '', // v-model to the textarea in html
        totalWord: 0, // A list with each word as a string for counting words
        dailyGoal: 0, // User-submitted value v-modeled to html TODO: allow commas
        progress: 1,
        wcId: '', // Change to whatever display button is. And then can be passed into wcUpdate

        week: [],
        filteredWcs: null,
        wordcountDict: {},
        wcByDay: null,
    },
    mounted() {
        this.username = document.querySelector('input[name=userid]').value // retrieving the primary key
        this.csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value
        this.getProj()
    },
    created() {
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
            axios.get('/apis/v1/projects/').then(response => {
                // Do for loop over response.data to check for user == username
                // Append only ones that match (so only run after that)
                for (let item of response.data) {
                    if (item.user == this.username) {
                        this.projects.push(item) // item is individual one that matches
                    }
                }
                this.projectData = this.projects.find(project => project.name === 'Unassigned') // Searching for project with this name
                if (this.projectData !== undefined) {
                    // projectData will either have 'Unassigned' project data or be undefined
                    // if there is something in projectData, assign variables using that
                    this.projectName = this.projectData.name
                    this.projectStartDate = this.projectData.start_date
                    this.projectEndDate = this.projectData.end_date
                    this.projectWcGoal = this.projectData.word_count_goal
                    this.projectId = this.projectData.id
                }
                if (this.projectName !== 'Unassigned') {
                    // If we did not find an "Unassigned" project, then make one using addDefaultProj()
                    this.addDefaultProj()
                }
            })
        },
        addDefaultProj() {
            // How can I use this function for user-submitted values, too?
            axios.post('/apis/v1/addproject/', {
                'user': this.username, // Does not need payload; automatic values exist already except for user
            }, {
                headers: { 'X-CSRFToken': this.csrfToken }
            }).then(response => {
                this.getProj()
                this.getWc()
            })
            // TODO: upate the wordcount with this new id??
        },
        createProject() {
            // Post the new project to the API
            // If there is an end date but not start date, set the start date to today in the post.
            if (this.newProjStartDate == null && this.newProjEndDate !== null)
                this.newProjStartDate = this.todaysDate
            if (this.newProjStartDate == null && this.newProjEndDate == null)
            {
                // This payload includes some default-assigned values
                axios.post('/apis/v1/addproject/', { 
                    'name': this.newProjectName,
                    'start_date': this.todaysDate,
                    'end_date': '2024-11-05',
                    'word_count_goal': this.newProjWcGoal,
                    'user': this.username,
                }, {
                    headers: { 'X-CSRFToken': this.csrfToken }
                }).then(response => {
                  this.projects.push(response.data);
                  this.newProjectName = '';
                  this.getProj()
                })
            } else {
                // This payload includes all user-submitted values
                axios.post('/apis/v1/addproject/', { 
                    'name': this.newProjectName,
                    'start_date': this.newProjStartDate,
                    'end_date': this.newProjEndDate,
                    'word_count_goal': this.newProjWcGoal
                }, {
                    headers: { 'X-CSRFToken': this.csrfToken }
                }).then(response => {
                  this.projects.push(response.data);
                  this.newProjectName = '';
                  this.getProj()
                })
            }
        },
        getWc() {
            // Retrieves a data model based on whatever day you want to view.
            axios.get('/apis/v1').then(response => {                
                    this.wordcounts = response.data
                    // alert(JSON.stringify(this.wordcounts));
                    // When the page mounts, filter down to date that is today's date.
                    let todaysWC = this.wordcounts.filter(wc => wc.date == `${new Date().toLocaleDateString('en-CA')}`)
                    this.allWcs = this.wordcounts.reduce((acc, wordcount) => acc + wordcount.todays_wc, 0);
                    //  If such a thing exists and array isn't empty, update the variables on the page
                    if (todaysWC.length > 0 && this.todaysDate == todaysWC[0].date){ // Other functions also call this function, so to keep this from running and filling all fields with today's text, this conditional checks and makes sure the data is really for the present day.
                        // Assigning the values to populate with the corresponding data.
                        this.projectId = todaysWC[0].project
                        this.projectName = todaysWC[0].project.name
                        this.wcId = todaysWC[0].id
                        this.textArea = todaysWC[0].text_area
                        this.dailyWC = todaysWC[0].todays_wc
                        this.dailyGoalComplete = todaysWC[0].daily_goal_bool
                        this.accessedToday = true
                        this.dailyGoal = todaysWC[0].daily_goal
                    }
                    // Starting logic of calendar. It's in this function because otherwise it executes before the wordcounts variable has anything
                    if (this.wcByDay === null) {
                            let today = new Date();
                            for (let i = 0; i < 7; i++) {
                                let day = new Date(today.getTime());
                                day.setDate(today.getDate() - i);
                                this.week.push(day);
                            }
                        }
                        //logic here for how to map wordcount object based on date
                        this.wcByDay = this.week.map(day => {
                            let wc = this.wordcounts.find(wc => {
                                // Check three booleans and they all have to be true.
                                // Looking for the date property
                                const sameDay = wc.date.slice(8) == day.getDate()
                                const sameMonth = wc.date.slice(5, 7) == day.getMonth() + 1
                                const sameYear = wc.date.slice(0, 4) == day.getFullYear()
                                return sameDay && sameMonth && sameYear
                            })
                            return {
                                // add default values for if the map does not find a match for that day.
                                date: day,
                                daily_goal: wc ? wc.daily_goal: 0,
                                todays_wc: wc ? wc.todays_wc: 0,
                                wc: wc ? wc.todays_wc: 0,
                                id: wc ? wc.id: 0
                            }
                        })
                        console.log(this.wcByDay)
                })
        },
        wcView(wcId) { // passing wcId in as param
            // More individual than getWC()
            // TODO: If user switches to this without creating an instance of today, how do I handle that? Can I auto make one here?
            // Populates the page with data corresponding to what is stored in database under the given id
            axios.get(`/apis/v1/${wcId}`).then(response => 
                    {this.textArea = response.data.text_area
                    this.projectId = response.data.project
                    this.dailyWC = response.data.todays_wc
                    this.todaysDate = response.data.date
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
            {
                if (this.selectedProject == null)
                {
                    // assigns selectedProject to projectId, which should be the Unassigned project that was retrieved earlier.
                    this.selectedProject = this.projectId
                }
                axios.post('/apis/v1/new/', {
                'project': this.selectedProject,
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
                if (this.selectedProject == null)
                {
                    // assigns selectedProject to projectId, which should be the Unassigned project that was retrieved earlier.
                    this.selectedProject = this.projectId
                }
                axios.put(`/apis/v1/${wcId}/`, {
                    // This does not have functionality to update project info; handled on separate form.
                    'project': this.selectedProject,
                    'todays_wc': this.dailyWC, // TODO: refuses to do the thing if wc is 0 (resolving as 1)
                    'text_area': this.textArea,
                    'user': this.username,
                    'daily_goal': this.dailyGoal,
                    'daily_goal_bool': this.dailyGoalComplete,
            }, {
                headers: { 'X-CSRFToken': this.csrfToken }
            }).then(res => this.getWc())
            console.log("Was accessed today.")}
        },
    },
    computed: {
        calcProgress() {
            let calcProg = this.dailyWC/this.dailyGoal
            this.progress = Math.round(this.dailyWC/this.dailyGoal*100)
            if (calcProg >= 1 && this.dailyGoal > 0) {
                this.progress = 100
            } else if (this.progress == 'Infinity') {
                this.progress = 0
            }
            return this.progress
        },
    }
})