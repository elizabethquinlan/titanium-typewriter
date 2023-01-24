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