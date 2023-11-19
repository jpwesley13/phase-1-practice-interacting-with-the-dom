document.addEventListener("DOMContentLoaded", () => {
    let counterHit = document.getElementById('counter');
    const paused = document.getElementById('pause');
    const upped = document.getElementById('plus');
    const downed = document.getElementById('minus');
    const liked = document.getElementById('heart');
    const otherButtons = [upped, downed, liked];

    //make the timer go (success!)
    function seconds() {
        counterHit.textContent = parseInt(counterHit.textContent) + 1
    };
    let timer = setInterval(seconds, 1000);

    //increment the counter with plus and minus (success!)
    upped.addEventListener("click", (event) => {
        counterHit.textContent = parseInt(counterHit.textContent) + 1
    });
    downed.addEventListener("click", (event) => {
        counterHit.textContent = parseInt(counterHit.textContent) - 1
    });

    //like a number and display how many likes it has (success!)
    let likesLand = {};
    liked.addEventListener("click", () => {
        const fatalCounter = counterHit.textContent;
        //the below is saying the Likes per a given counter position is either the number itself (+1 after clicked) or 0 (+1 after clicked). Because if the number of likes is 0, then it's false, so it goes to the or (which is also 0) and then adds 1.
        likesLand[fatalCounter] = (likesLand[fatalCounter] || 0) + 1;

        //it is important to have this code in the same block wher ethe eventListener is happening, otherwise it won't actually come into effect in the correct order.
        const valentine = document.querySelector('.likes');
        //As Ada pointed out, "In this updated code, the valentine.innerHTML = ''; line is added to clear any existing li elements before appending new ones. Then, the loop that creates and appends the li elements is inside the event listener, so that it runs every time a like is clicked."
        valentine.innerHTML = ''
    for (const moment in likesLand) {
        const count = likesLand[moment];
        const currentHeart = document.createElement('li');
        currentHeart.textContent = `Moment number ${moment} has ${count} like(s)~!`;
        valentine.appendChild(currentHeart)
    }
    //The failed code looked like this. Some things were not defined properly like currentheart and other stuff is just missing or directed wrong, like queryselector.
    // const likesLand = document.querySelector("ul.likes");
    // liked.addEventListener("click", (event) => {
    //     currentHeart = likesLand.createElement("li");
    //     currentHeart.textContent = "good job"
    // })
    })

    //make the timer pause and resume (success!)
    paused.addEventListener("click", () => {
        //console.log("Clicked on paused element");
        if (paused.textContent === ' pause ') {
            clearInterval(timer);
            paused.innerText = ' resume ';
            paused.style.color = "red";
            otherButtons.forEach((button) => {
                button.disabled = true;
            })
        } else {
            //it's important to redefine timer here. Just putting timer or just putting the setInterval won't get te job done.
            timer = setInterval(seconds, 1000);
            paused.innerText = ' pause ';
            paused.style.color = "black";
            otherButtons.forEach((button) => {
                button.disabled = false;
            })
       }
    })

    //let comments be left on the gameplay (success!)
    let toxic = document.querySelector('form');
    toxic.addEventListener("submit", (event) => {
        event.preventDefault()
        //const toxic = document.querySelector('#list');
        workOnComments(event.target.elements.comment.value)
        toxic.reset();
    })
        function workOnComments(comment) {
            let gamerMoment = document.createElement('p');
            gamerMoment.textContent = comment;
            console.log(gamerMoment);
            document.querySelector('#list').appendChild(gamerMoment)
            //toxic.appendChild(gamerMoment)
        }
    //The explanation for using elements.comment instead of the reference error id is as follows: 
    //In this case, you are grabbing the input value by its name using event.target.elements.comment.value.
    // The reason for using the name attribute is that when you submit a form, the form data is sent to the server as key-value pairs, where the name attribute is used as the key. In JavaScript, you can access form elements using the elements property of the form, which returns a collection of form elements indexed by their name attribute.
    // Using the id attribute would also work, but it's more commonly used for uniquely identifying elements and accessing them directly using document.getElementById().
    // In your case, since you want to access the input value of the comment field, using event.target.elements.comment.value is a more appropriate approach. It ensures that you're targeting the specific input field you want, regardless of whether you use an id or name attribute.
    // It's good practice to use name attributes when working with forms because it helps with form submission and makes the code more readable and maintainable.
})