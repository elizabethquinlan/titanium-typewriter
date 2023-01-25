
new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        dailyWC: 1,
        // v-model to the textarea in html
        textArea: "",
        totalWord: 0,
        // TODO: Later become a user-submitted value
        dailyGoal: 130,
        progress: 1,
    },
    mounted() {
        this.getWc()
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
            axios.get('/apis/v1').then(response => this.dailyWC = response.data)
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