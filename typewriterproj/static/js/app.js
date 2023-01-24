
new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        dailyWC: 1,
        // v-model to the textarea in html
        textArea: "",
        totalcharacter: 0,
    },
    methods: {
        countText() {
            console.log("here we are!")
            this.totalcharacter = this.textArea.match(/[\w\d\’\'-]+/gi);//
            this.dailyWC = this.totalcharacter.length
        },
    },
    computed: {
    }
})