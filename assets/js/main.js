/* 
Descrizione
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:

Milestone 1
Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
id del post, numero progressivo da 1 a n
nome autore,
foto autore,
data in formato americano (mm-gg-yyyy),
testo del post,
immagine (non tutti i post devono avere una immagine),
numero di likes.
Non è necessario creare date casuali Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)

Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.

BONUS
Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo. Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
Formattare le date in formato italiano (gg/mm/aaaa)
Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
*/

const posts = [
   {
      "id": 1,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/300?image=171",
      "author": {
         "name": "Phil Mangione",
         "image": "https://unsplash.it/300/300?image=15"
      },
      "likes": 80,
      "created": "2021-06-25"
   },
   {
      "id": 2,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/400?image=112",
      "author": {
         "name": "Sofia Perlari",
         "image": "https://unsplash.it/300/300?image=10"
      },
      "likes": 120,
      "created": "2021-09-03"
   },
   {
      "id": 3,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/400?image=234",
      "author": {
         "name": "Chiara Passaro",
         "image": "https://unsplash.it/300/300?image=20"
      },
      "likes": 78,
      "created": "2021-05-15"
   },
   {
      "id": 4,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/400?image=24",
      "author": {
         "name": "Luca Formicola",
         "image": null
      },
      "likes": 56,
      "created": "2021-04-03"
   },
   {
      "id": 5,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/400?image=534",
      "author": {
         "name": "Alessandro Sainato",
         "image": "https://unsplash.it/300/300?image=29"
      },
      "likes": 95,
      "created": "2021-03-05"
   }
];


// select the container from DOM
const containerEl = document.getElementById('container');

// loop inside the array and retrieve the functions
posts.forEach(post => {
   // create variable fot final markup element
   const finalMarkup = createPost(post);
   containerEl.insertAdjacentElement('beforeend', finalMarkup);
});

// select the button from DOM
const likeBtnElement = document.querySelectorAll('.like-button');

likeBtnElement.forEach(btn => {
   btn.addEventListener('click', likeBtnListen(btn));
})


/* FUNCTIONS */

// function create a post
function createPost(postElements) {
   const thisPost = document.createElement('div');
   thisPost.classList.add('post');
   thisPost.innerHTML += createPostHeader(postElements) + createPostText(postElements) + createPostImage(postElements) + createPostFooter(postElements);
   console.log(thisPost);
   return thisPost;
}

// function create post header
function createPostHeader(postElements) {

   // create markup variable with let for modify it throught conditions 
   let postHeaderMarkup = `
   <div class="post__header">
      <div class="post-meta">
         <div class="post-meta__icon">`;

   // condition if the image is not cracked/null
   if (postElements.author.image != null) {
      postHeaderMarkup += `<img class="profile-pic" src="${postElements.author.image}" alt="${postElements.author.name}">`

   } else {
      // add markup for cracked images with initials of author's name
      postHeaderMarkup += `
      <div class="profile-pic-default">
         <b> ${nameInitials(postElements.author.name)} </b>
      </div>`
   }

   // add final part of markup
   postHeaderMarkup += `
      </div>
         <div class="post-meta__data">
            <div class="post-meta__author">${postElements.author.name}</div>
            <div class="post-meta__time">${postElements.created}</div>
         </div>
      </div>
   </div>
   `
   console.log(postHeaderMarkup);
   return postHeaderMarkup;
}

// function get initials of name author
function nameInitials(authorName) {
   const nameArray = authorName.split(' ');
   console.log(nameArray);
   const initialsArray = nameArray.map(string => {
      return string.charAt(0).toUpperCase();
   })
   const nameAuthorInitials = initialsArray.join('');
   return nameAuthorInitials;
}

// function create post text
function createPostText(text) {
   const postTextMarkup = `
   <div class="post__text">
      ${text.content}
   </div>
   `
   console.log(postTextMarkup);
   return postTextMarkup
}

// function create post image
function createPostImage(image) {
   const postImgMarkup = `
   <div class="post__image">
      <img src="${image.media}" alt="">
   </div>
   `

   console.log(postImgMarkup);
   return postImgMarkup;

}

// function create post footer
function createPostFooter(postElements) {

   const postFooterMarkup = `
   <div class="post__footer">
      <div class="likes js-likes">
         <div class="likes__cta">
            <a class="like-button js-like-button" href="#" data-postid="${postElements.id}">
               <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
               <span class="like-button__label">Mi Piace</span>
            </a>
         </div>
         <div class="likes__counter">
            Piace a <b id="like-counter-${postElements.id}" class="js-likes-counter">${postElements.likes}</b> persone
         </div>
      </div>
   </div>
   `

   console.log(postFooterMarkup);
   return postFooterMarkup;

}


// function event to button
function likeBtnListen(likeBtn) {

likeBtn.classList.toggle('like-button--liked');
  
}