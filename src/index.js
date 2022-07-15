let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch(`http://localhost:3000/toys`)
  .then(resp => resp.json())
  .then(toys => handleDisplay(toys));
  
})

function handleDisplay(toysObj) {
  const brTag = document.createElement('br')
  toysObj.forEach(toy => {
    //console.log(toy)
    let card = document.createElement('div');
    card.className = 'card'
    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src='${toy.image}' class='toy-avatar'>
    <p>${toy.likes} likes</p>
    <button class='like-btn' id=${toy.id}>Like ❤️</button>
    `
    document.getElementById('toy-collection').appendChild(card)
  })
  //console.log(document.getElementById('toy-collection'))
}

// adds new toy. takes name and URL, performs POST, updates DOM
document.querySelector('form.add-toy-form').addEventListener('submit', (e) => {
  e.preventDefault();
  let form = document.querySelector('form.add-toy-form')
  let newToyName = e.target.querySelector(':nth-child(2)').value;
  let newToyImg = e.target.querySelector(':nth-child(4)').value
  //console.log(newToyImg)
  let newToyObj = {
    name: newToyName,
    image: newToyImg,
    likes: 0
  }
  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newToyObj)
  })
  .then(res => res.json())
  .then(data => {
    let card = document.createElement('div');
    card.className = 'card'
    card.innerHTML = `
    <h2>${data.name}</h2>
    <img src='${data.image}' class='toy-avatar'>
    <p>${data.likes} likes</p>
    <button class='like-btn' id=${data.id}>Like ❤️</button>
    `
    document.getElementById('toy-collection').appendChild(card)
  })
  form.reset();
})

