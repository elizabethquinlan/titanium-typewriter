// This was for the modal, which I want to return to eventually.

// const generateDates = (year, month) => {
//   const numDays = new Date(year, month + 1, 0).getDate();
//   const dates = [];
//   for (let i = 1; i <= numDays; i++) {
//     dates.push(new Date(year, month, i));
//   }
//   return dates;
// };

// const year = 2022;
// const month = 0; // January
// const dates = generateDates(year, month);


// generateDates() {
//   const numDays = new Date(year, month + 1, 0).getDate();
//   const dates = [];
//   for (let i = 1; i <= numDays; i++) {
//     dates.push(new Date(year, month, i));
//   }
  
//   this.year = 2022;
//   this.month = 2; // January
//   dates = generateDates(this.year, month)
//   return dates;
// },
// axios.get('/api/dailywc/', {
//   // How the fuck is this going to work.
// params: {
//   year: this.year,
//   month: this.month,
// }, }).then(response => {
//   alert(this.response.data)
//   this.dateWordCounts = response.data.reduce((acc, dailywc) => {
//       acc[dailywc.date] = dailywc.word_count
//   })
// })