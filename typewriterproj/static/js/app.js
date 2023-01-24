const textArea = document.getElementById('description');
textArea.addEventListener('input', () => {
    var textLength =  textArea.value;
    document.getElementById('countText').innerHTML='Total words: '+getWordCount(textLength);
});

function getWordCount(str) {
    // reg ex that targets what will and will not count as a word
    // g = global, match all instances of the pattern in a string,
    // i = case-insensitive
    var matches = str.match(/[\w\d\’\'-]+/gi);
    // return either matches or a wc of 0
    return matches ? matches.length : 0;
}

// new Vue({
//     el: '#app',
//     data: {
//         dayWC: 0,
//         clicks: 0,
//         variable: 'this is a test and you are failing.'
//     },
//     methods: {
//         logInput(e) {
//             this.inputField = e.target.value
//         },
//         clicker(count) {
//             this.clicks += count
//         },
//     },
// })