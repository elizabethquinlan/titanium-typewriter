new Vue({
    el: '#app',
    data: {
        dailyWC: 0,
        totalWC: 0,
        complete: false,
        textArea: null
    },
    methods: {
        getWordCount() {
            const textArea = document.getElementById('description');
            textArea.addEventListener('input', () => {
                var textLn =  textArea.value;
                document.getElementById('countText').innerHTML=
                'Total words: '+getWordCount(textLn);})
        }
    },
    computed: {
        calcWordCount() {
            return str.trim().split(/\s+/).length
    }}
})



const textArea = document.getElementById('description');
textArea.addEventListener('input', () => {
    var textLn =  textArea.value;
    document.getElementById('countText').innerHTML='Total words: '+getWordCount(textLn);
});

function getWordCount(str) {
    // reg ex that targets what will and will not count as a word
    // g = global, match all instances of the pattern in a string,
    // i = case-insensitive
    var matches = str.match(/[\w\d\’\'-]+/gi);
    // return either matches or a wc of 0
    return matches ? matches.length : 0;
}



axios.get(`/apis/v1/${116}/`, {
    headers: { 'X-CSRFToken': this.csrfToken }
}).then(res => this.wordcounts = res.data)
// When clicking on the corresponding date, it will populate the text box and word counter with that day's data
axios.get('/apis/v1').then(response => this.wordcounts = response.data)


createUpdate() {
    // If this is false AND it's today's date.
    if (!this.accessedToday && this.todaysDate == `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`) 
    {
        // console.log(this.accessedToday)
        console.log("This was clicked")
        axios.post('/apis/v1/today/', {
    'project_name': this.projectName,
    'todays_wc': this.dailyWC,
    'text_area': this.textArea},
        {headers: { 'X-CSRFToken': this.csrfToken }
    }).then(response => {
        this.getWc()
        console.log(response)
        console.log("This was clicked.....")
        console.log(response.data)
    })} else console.log("Was accessed today ig")
    // axios.post(`/apis/v1/today/`, {
    // API view and url
}


// addWc() {
//     axios.post('/apis/v1/new/', {
//         'project_name': this.projectName,
//         'todays_wc': this.dailyWC,
//         'text_area': this.textArea,
//         'date': this.todaysDate,
//         'accessed_today': true // Set to true for the boolean later.
//         // doesn't include date here because it is set to default datetime.date.today in models
//     }, {
//         headers: { 'X-CSRFToken': this.csrfToken }
//     }).then(res => this.getWc())
// },
// wcUpdate(wcId) {
//     axios.put(`/apis/v1/${wcId}/`, {
//         'project_name': this.projectName,
//         'todays_wc': this.dailyWC,
//         'text_area': this.textArea
//     },
//     {
//         headers: { 'X-CSRFToken': this.csrfToken }
//     }).then(res => this.getWc())
// },

// todaysDate: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,


// createUpdate(wcId) {
//     // If this is false AND it's today's date.
//     // Means you didn't access it today yet and can create a new instance.
//     if (!this.accessedToday && this.todaysDate == `${new Date().toLocaleDateString('en-CA')}`) 
//     {axios.post('/apis/v1/new/', {
//         'project': 54,
//         // 'project': 33,
//         //'project': this.projectData, // this needs to be more complicated...
//         // 'project': {
//         //     // THIS CREATES A NEW PROJECT?? INSTEAD OF ADDING TO EXISTING ONE?
//         //     //'id': 16, //completely ignored this lol
//         //     'id': this.projectId,
//         //     'name': this.projectName,
//         //     'start_date': this.projectStartDate,
//         //     'end_date': this.projectEndDate,
//         //     'word_count_goal': this.projectWcGoal
//         // },
//         'todays_wc': this.dailyWC,
//         'text_area': this.textArea,

// Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }


// IDK WHAT THIS DOES ANYMORE:
// calendarRows() {
//     for (let i = 0; i < this.dates.length; i++) {
//       if (i % 7 === 0 && i !== 0) {
//         this.rows.push(this.row);
//       }
//       this.row.push(this.dates[i]);
//       if (i === this.dates.length - 1) {
//         this.rows.push(row);
//       }
//     }
//     return this.rows;
// }

// wordcountsInWeek() {
//     const week = this.weekdays;
//     const wordcountsArray = Object.values(this.wordcounts);
//     return wordcountsArray.filter(wordcount => {
//       return week.some(day => {
//         return day.toDateString() === new Date(wordcount.date).toDateString();
//       });
//     });
// },


// GOOD FOR MONTHLY:
// generateDates() {
//     this.numDays = new Date(this.year, this.month + 1, 0).getDate();
//     this.dates = [];
//     for (let i = 1; i <= this.numDays; i++) {
//         this.dates.push(new Date(this.year, this.month, i));
//     }
    
//     this.year = 2022; // hardcoded for now.
//     this.month = 2; // January
//     // this.dates = generateDates(this.year, this.month)
//     return this.dates;
// },

// year: 2022,
// month: 0,
// dates: [],
// dateWordCounts: {},
// daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
// rows: [],
// row: [],
// numDays: null,
// dates: [],