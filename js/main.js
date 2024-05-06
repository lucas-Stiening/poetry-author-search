document.querySelector('button').addEventListener('click', getByPoet)
const rando = Math.floor( Math.random() * 50 )

function getByPoet(){
    let poet = document.querySelector('input').value

    fetch(`https://poetrydb.org/author/${poet}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        console.log(data)
        if(data.status === 404){
            alert('We apologize this search did not work. Please verify that the authors name is spelled correctly.')
        } else if(data.status !== 404){
            let poem = data[rando]
            let lines = poem.lines
            document.querySelector('#title').innerText = poem.title
            document.querySelector('span').innerText = poem.author
            for(i = 0; i<lines.length; i++){
                document.querySelector('#lines').innerText += lines[i] + "\n"
            }
            
        }
        
    })
    .catch(err => {
        console.log(`error ${err}`)
        
    });
}
