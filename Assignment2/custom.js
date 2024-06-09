const words = ['Awesome', 'Fantastic', 'Fabulous', 
'Superb', 'Perfect', 'Brilliant', 'Coming up Roses'];

let r1 = parseInt(Math.random()*words.length);

let headingText2 = document.getElementById("headingText");
headingText2.innerHTML = words[r1];

//////////////////////////////////////////////////
let currDate = new Date();

let hour2 = document.getElementById("hour");
let minute2 = document.getElementById("minute");
let meridiem2 = document.getElementById("meridiem");
let greeting2 = document.getElementById("greeting");
let screen2 = document.getElementById("screen");
console.log(currDate);

let hours = currDate.getHours();
let minutes=currDate.getMinutes();


if (hours >= 12)
{
    meridiem2.innerHTML = "pm";
    if (hours > 12)
    {
        hours -= 12;
    }

    if (hours<6 || hours === 12)
    {
        greeting2.innerHTML = "Good Afternoon!";
        screen2.style.backgroundImage = "url(images/backgrounds/afternoon.png)";

    }
    else
    {
        greeting2.innerHTML = "Good Evening!"
        screen2.style.backgroundImage = "url(images/backgrounds/evening.png)";
    }
}
else
{
    meridiem2.innerHTML = "am";
    if (hours < 6)
    {
        greeting2.innerHTML = "Good Night!";
        screen2.style.backgroundImage = "url(images/backgrounds/night.png)";
    }
    else
    {
        greeting2.innerHTML = "Good Morning!";
        screen2.style.backgroundImage = "url(images/backgrounds/morning.png)";
    }
}

hour2.innerHTML = String(hours).padStart(2,'0');
minute2.innerHTML = String(minutes).padStart(2,'0');

////////////////////////////////////////////////

let num = parseInt(prompt("Enter a positive number greater than or equal to 3: "));

while (isNaN(num) || num<3)
{
    num = prompt("Please enter a positive number greater than or equal to 3: ");
}


let r2 = parseInt(Math.random()*num)+1;
let r3 = parseInt(Math.random()*num)+1;
let r4 = parseInt(Math.random()*num)+1;

while (r2 == r3 || r2==r4)
{
    r2 = parseInt(Math.random()*num)+1;
}
while (r3==r4 || r3==r2)
{
    r3 = parseInt(Math.random()*num)+1;
}
while (r4==r2 || r4==r3)
{
    r4 = parseInt(Math.random()*num)+1;
}

let lucky2 = document.getElementById("lucky");

lucky2.innerHTML = `Your three lucky numbers for today are ${r2}, ${r3}, and ${r4}`;

/////////////////////////////////////////////////////

let r5 = parseInt(Math.random()*6)+1;
let r6 = parseInt(Math.random()*6)+1;

head2 = document.getElementById("head");
body2 = document.getElementById("body");

head2.src = `images/heads/head${r5}.png`;
body2.src = `images/bodies/body${r6}.png`;