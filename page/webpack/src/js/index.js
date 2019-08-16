const _ = require('lodash')

require('../css/index.scss')
require('../css/index2.css')
var arr = [
    { 'user': 'barney', 'active': false },
    { 'user': 'fred', 'active': false },
    { 'user': 'pebbles', 'active': true }
]

let name = _.findIndex(arr, function(o) { return o.user == 'barney'; });

console.log(name, '<><><><><><>')
