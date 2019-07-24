function remove(arr, item) {
    if (arr.length) {
        var index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}
//
function cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// 
function aa(str) {
    var hyphenateRE = /\B([A-Z])/g;
    return str.replace(hyphenateRE, '-$1').toLowerCase()
}


console.log(aa('jfJKsdfH'))


let arr = [
    {name: 1},
    {name: 2},
    {name: 3},
    {name: 4},
    {name: 5},
    {name: 6},
    {name: 7},
    {name: 8},
    {name: 9},
    {name: 10},
    {name: 11},
    {name: 12},
    {name: 13},
    {name: 14},
    {name: 15},
]

console.log(arr.splice(3, 1))

let obj = {
    name: 'allen'
}

let obj2 = {
    name: 'allen2'
}

let obj3 = Object.assign(obj, obj2)

obj3.name = 'allen4'

console.log(obj, obj2, obj3, 888)
