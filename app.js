const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btnReset = document.getElementsByClassName("btn__reset")[0];
const overlay = document.getElementById("overlay");
const hearts = document.querySelector('#scoreboard > ol');

let missed = 0;

const phrases = ["she need some milk",
                 "whats nine plus ten", 
                 "ive mcfallen", 
                 "oh you know i aint allowed to think", 
                 "look at all those chickens"
                ];

btnReset.addEventListener('click', () => {
    overlay.style.display = 'none';
});

function getRandomPhraseAsArray(arr) {
    // Selects a random phrase
   let randomNumber = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomNumber];
    const phraseArr = randomPhrase.split('');
    // let phraseArr = []
    // for (let i = 0; i < randomPhrase.length; i++) {
    //     phraseArr.push(randomPhrase[i])
    // }
    return phraseArr;
}

function addPhraseToDisplay(arr) {
    // Adds the phrase to the document
    // loop through array of characters
    for (let i = 0; i < arr.length; i++) {
        // create li
        const li = document.createElement('li');
        // put character inside list item
        li.textContent = arr[i];
        // add letter or space class to every character
        if (arr[i] === ' ') {
            li.className = "space";
        } else {
            li.className = "letter";
        }
        // append li to ul
        const ul = document.querySelector('#phrase ul');
        ul.appendChild(li);
    }
}

function checkLetter(button) {
    let match = null;
    // get all elements with class "letter"
    const liElements = document.querySelectorAll('li.letter');
    // loop over all the letters
    for (let i = 0; i < liElements.length; i++) {
        // if letter matches the letter inside button
        if (button.textContent === liElements[i].textContent) {
            // add class "show" to this li
            // store matching letter inside a variable
            liElements[i].classList.add('show');
            match = liElements[i];
        } 
     // return the matching letter, if it exists. if not, return null
    }
    return match;
    // return the matching letter, if it exists. if not, return null
}

function removeHeart() {
    // get the children of "hearts"
    const heartLength = hearts.children.length;
    for (let i = heartLength; i > 0; i--) {
        // start at the rightmost heart 
        let heart = hearts.children[i-1].lastElementChild;
        let heartSrc = heart.getAttribute('src');
        // if it's src is live, change it. 
        if (heartSrc === 'images/liveHeart.png') {
            heart.setAttribute('src', 'images/lostHeart.png');
            break;
        }
        // if the src is not live, move on to the next 
    }    
    // get the rightmost heart with a "live" src attribute

    // change the src attribute to "lost"
}

function checkWin() {
    let show = document.querySelectorAll('li.show');
    let letter = document.querySelectorAll('li.letter');
    if (show.length === letter.length) {
        overlay.className = "win";
        overlay.style.display = "flex";
        overlay.innerHTML = '<h2>you won!</h2>';

    } else if (missed > 4) {
        overlay.className = "lose";
        overlay.style.display = "flex";        
        overlay.innerHTML = '<h2>you lost!</h2>';

    }

}


qwerty.addEventListener('click', (event) => {
    if (event.target.tagName === "BUTTON") {
        // add chosen class to this button
            event.target.className = "chosen";
        // set disabled attribute for this button to true
            event.target.setAttribute('disabled', 'true');
        // call checkLetter on this button and store the result in a variable caled letterFound
        const letterFound = checkLetter(event.target);
        // if letterFound returns a null value
        if (letterFound === null) {
            missed += 1;
            removeHeart();
        }
        checkWin();
    }
});






const gamePhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(gamePhrase);
