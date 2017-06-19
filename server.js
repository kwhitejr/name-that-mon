var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sh1rogane',
  database: 'pokemon'
})

//Start on a changable array of numbers. Missing ability to splice index # of chosen pokemon
//Need to find out how to refresh on new session, but not new page
var pokeArray = [];
for (var i = 1; i <= 151; i++) {
  pokeArray.push(i)
}



// function getRandomArbitrary(min, max) {
//     return Math.random() * (151 - 1) + 1;
// }
//
// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (151 - 1 + 1)) + 1;
// }

var specCalled = pokeArray[Math.floor(Math.random() * pokeArray.length)];

console.log(specCalled);
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
  var sql = "SELECT species FROM pokemon where id = ?";
  connection.query(sql,specCalled, function(err, results) {
    if (err) throw err
    console.log(results[0].species)
  })
})
