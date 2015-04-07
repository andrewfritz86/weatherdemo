function invokeACallBack(callback, string){
    callback(string)
}

function namer(arg){
    console.log(arg);
}

var tired = ['a', 'b', 'c', 'z']

tired.forEach(function(elementInArray){
    console.log(elementInArray.toUpperCase())
})


function silly(element){
    console.log(element.toUpperCase())
}


tired.forEach(silly)



