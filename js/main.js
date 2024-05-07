document.querySelector('#getPoem').addEventListener('click', getByPoet)
document.querySelector('#speech').addEventListener('click', readAloud)

function getByPoet(){
    let poet = document.querySelector('input').value
    document.querySelector('#lines').innerText = ''
    fetch(`https://poetrydb.org/author/${poet}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        console.log(data)
        const rando = Math.floor( Math.random() * data.length)
        if(data.status === 404){
            alert('We apologize this search did not work. Please verify that the authors name is spelled correctly. If the search still is not successful, the poet may not be in our database.')
        } else if(data.status !== 404){
            let poem = data[rando]
            let lines = poem.lines
            document.querySelector('#title').innerText = poem.title
            document.querySelector('span').innerText = 'Author:' + poem.author
            for(i = 0; i<lines.length; i++){
                document.querySelector('#lines').innerText += lines[i] + "\n"
            }
            
        }
        
    })
    .catch(err => {
        console.log(`error ${err}`)
        
    });
}

function readAloud(){
    'speechSynthesis' in window ? console.log("Web Speech API supported!") : alert("Web Speech API not supported :-(")

    const synth = window.speechSynthesis
    let ourText = document.querySelector('#lines').innerText
    const utterThis = new SpeechSynthesisUtterance(ourText)
    synth.speak(utterThis)
}