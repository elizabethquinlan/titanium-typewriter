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