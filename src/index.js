/** GLOBALS **/
let addToy = false;
const toyCollection = document.getElementById('toy-collection'); //for appending purposes below
//const card = document.createElement('div');
//let likeButton = card.querySelector(".like-btn");

//EVENTS
const toyFormContainer = document.querySelector(".container");  //when using querySelector for a class use a dot .
const addBtn = document.querySelector("#new-toy-btn");


/** EVENT LISTENER **/
//No need to DOMContentLoaded as script tag was moved to the bottom of the DOM

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy; //flips value to true
  if (addToy) {
    toyFormContainer.style.display = "block";
    //submit event listener
    toyFormContainer.addEventListener('submit', handleSubmit()) //replace console.log with handleSubmit/ what about invoke with ()
    } else {
      toyFormContainer.style.display = "none";
    }
  });

/** EVENT HANDLER **/
function handleSubmit(event) {
  event.preventDefault();
  //referencing toy object, doesn't look like the below is necessary
  // let toyObject = {
  //   name: event.target.name.value,
  //   image: event.target.image.value,
  //   likes: event.target.likes.value,
  //   id: event.target.id.value
  // }
  //render0neToy(toyObject);
  addNewToy(event.target);
  updateToysLikes(event.target);
}


/** RENDERER **/
//This is rendering every elemnent in the toy object being passed in. So adding an event listener inside will make it repeat "x" times 
function render0neToy(toyObj) {
  // Create a div card and the elements we want to append to it. Then append it to the DOM. 

    const card = document.createElement('div');

    let h2 = document.createElement('h2');
    h2.innerText = toyObj.name;

    let img = document.createElement('img');
    img.setAttribute('src', toyObj.image)
    img.setAttribute('class', 'toy-avatar')

    let p = document.createElement('p');
    p.innerText = toyObj.likes;

    let btn = document.createElement('button');
    btn.className = 'like-btn';
    btn.setAttribute('id', toyObj.id);
    btn.innerText = 'like';
    btn.addEventListener('click', () => {
      toyObj.likes +=1;
      updateToysLikes(toyObj);
    })

    card.append(h2, img, p, btn);

    //Add the card to the DOM
    toyCollection.append(card); //appendChild used for HTML DOM nodes   


}





//** FETCH REQUESTS **//
// Get all toys
function getAllToys() {
  fetch(" http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => render0neToy(toy)))//render0neToy(toy))
} 
getAllToys(); //initialize



// Post a new toy
// toyObj is represented by the "event target" object via invoking the function from event handler 
function addNewToy(toyObj) {
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "name": toyObj.name.value,
      "image": toyObj.image.value,
      "likes": 0
    })
  })
  // .then(res => res.json())
  // .then(json => console.log(json)) 
  // Hypothesis: new toy is already getting rendered from calling the getAllToys and addNewToy
  // .then(json => {
  //   let new_toy = renderToys(json);
  //   toyCollection.append(new_toy)
  // })
}

// Update a toy's like
function updateToysLikes(toyObj) {
  
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method:"PATCH",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyObj)
  })

  .then(res => res.json())
  .then(json => console.log(json))
}

