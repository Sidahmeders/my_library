let p = new Promise((res, rej) => {
    if(true) {
        res('you have succeeded in the then')
    } else {
        rej('you fucking catch it')
    }
   
})


p.then(msg=> console.log('THEN :'+ msg))
 .catch(msg => console.log('CATCH :'+ msg))


let person1 = true
let person2 = true

function watchMovie(call, callback) {
    if(person1 && person2) {
        
    } else {

    }
}



