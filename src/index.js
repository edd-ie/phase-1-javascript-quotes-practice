let list = document.querySelector('#quote-list')

fetch('http://localhost:3000/quotes?_embed=likes',{method: 'GET',})
.then(res=>res.json())
.then(data => {
    console.log(data[0])

    for (i of data){
        let card = document.createElement('li');
        card.setAttribute('class', 'quote-card');
        list.appendChild(card)

        let blockquote = document.createElement('blockquote');
        blockquote.setAttribute('class', 'blockquote');
        card.appendChild(blockquote)

        let quote = document.createElement('p');
        quote.setAttribute('class', 'mb-0');
        let footer = document.createElement('footer');
        footer.setAttribute('class', 'blockquote-footer');
        let br = document.createElement('br');

        let success = document.createElement('button');
        success.setAttribute('class', 'btn-success');

        let danger = document.createElement('button');
        danger.setAttribute('class', 'btn-danger')

        blockquote.appendChild(quote);
        blockquote.appendChild(footer);
        blockquote.appendChild(br);
        blockquote.appendChild(success);
        blockquote.appendChild(danger);


        quote.textContent = i.quote
        footer.textContent = i.author;
        success.textContent = 'Like: '
        danger.textContent = 'Delete'
        

        danger.addEventListener('click', () => {
            fetch(`http://localhost:3000/quotes/${i.id}`,{
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            })
        });

        let span = document.createElement('span');
        success.appendChild(span);

        

    }
})






// fetch(`http://localhost:3000/likes`)
// .then(res => res.json())
// .then(info => {

//     console.log(info.length)
//     console.log(list.children.length)
//     let db = info.length
//     console.log(db)
//     let web = list.children.length

//     for(db; db < web+1; db++){
//         data = {id: db, quoteId: 1, createdAt: new Date().getTime()}
        
//         fetch("http://localhost:3000/likes", {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(data)
//         }).catch(err=>console.error(err.message));
//     }

// })

fetch(`http://localhost:3000/likes`)
.then(res => res.json())
.then(info => {
    console.log('Info:',info[1].quoteId);

    let count = 0
    for (child of list.children){
        let workspace = child.children[0].children[3].children[0]
        workspace.textContent = info[count].quoteId
        count++;       
    }

    let view = Array.from(list.children)
    console.log(view.length)

    for (let i = 0; i < view.length; i++){
        let btn = view[i].children[0].children[3];
        btn.addEventListener("click",() =>{
            vote = parseInt(btn.children[0].innerHTML)
            btn.children[0].innerHTML = vote+1
            let newVote = {quoteId: (vote+1)}
            
            fetch(`http://localhost:3000/likes/${i+1}`,{
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newVote)
            })
        })
    }
    

})





// success.addEventListener('click',()=>{
//     let vote = span.value
//     console.log('vote', vote) 
// })