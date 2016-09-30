var XLSX = require('XLSX');
var workbook = XLSX.readFile('traffic.xlsx');

/*
var first_sheet_name = workbook.SheetNames[0];
var address_of_cell = 'A1';

// Get worksheet
var worksheet = workbook.Sheets[first_sheet_name];

var address_of_cell = 'A2';

// Find desired cell
var desired_cell = worksheet[address_of_cell];

// Get the value
var desired_value = desired_cell.v;

console.log(desired_value);
*/



/*
// Iterates through every nonempty of every sheet and dumps values
var sheet_name_list = workbook.SheetNames;
sheet_name_list.forEach(function(y) { // iterate through sheets
  var worksheet = workbook.Sheets[y];
  for (z in worksheet) {
    // all keys that do not begin with "!" correspond to cell addresses
    if(z[0] === '!') continue;
    console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
  }
});
*/