let input_box = document.getElementById('context');
let upper_tick_btn = document.getElementsByClassName('upper_btn1')[0];
let div_storage = document.getElementsByClassName('lower_output')[0];
let clear_btn = document.getElementsByClassName('clear_btn')[0];
let lower_output_container = document.getElementById("lower_output_container");
let time = document.getElementById("time");
let date = document.getElementById("date");
let motivation = document.getElementById("motivation");
let todaysGoal = document.getElementById("todays_goal_textarea");
let googleTextarea = document.getElementById("type_something");
let searchButton = document.getElementById("search");


const mainWorking = function (key, values) {
    const upper_div = document.createElement('div');
    div_storage.appendChild(upper_div);

    const create_div = document.createElement("div");
    create_div.classList.add('create_div');
    create_div.innerHTML = values;
    upper_div.appendChild(create_div);

    const tick_image = document.createElement('img');
    tick_image.src = './image/tick.png';
    tick_image.setAttribute('id', 'div_tick_btn');

    const remove_image = document.createElement('img');
    remove_image.src = './image/remove.png';
    remove_image.setAttribute('id', 'div_remove_btn');

    const delete_image = document.createElement('img');
    delete_image.src = './image/delete.png';
    delete_image.setAttribute('id', 'div_delete_btn');

    upper_div.appendChild(tick_image);
    upper_div.appendChild(remove_image);
    upper_div.appendChild(delete_image);

    tick_image.addEventListener('click', () => {
        create_div.style.background = 'rgba(0, 255, 0, 0.35)';
    })

    remove_image.addEventListener('click', () => {
        create_div.style.background = 'rgba(255, 0, 0, 0.3)';
    })

    delete_image.addEventListener('click', () => {
        upper_div.remove();
        localStorage.removeItem(key);
    })
    delete_image.addEventListener('click', () => {
        upper_div.remove();
        localStorage.removeItem(key);
    });
}

// window loading
window.onload = function () {
    if (localStorage.length === 0) {
        console.log("local storage is empty");
    }
    else {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let values = localStorage.getItem(key);
            if (key === "goal") {
                continue;
            }

            mainWorking(key, values);
        }
    }
    // trim() used for ignoring empty string to save
    if (todaysGoal.value.trim()) {
        localStorage.setItem("goal", todaysGoal.value);
    }
    todaysGoal.value = localStorage.getItem("goal");
}

todaysGoal.addEventListener("change", () => {
    if (todaysGoal.value.trim()) {
        localStorage.setItem("goal", todaysGoal.value);
    }
    todaysGoal.value = localStorage.getItem("goal");
})

clear_btn.addEventListener('click', () => {
    div_storage.textContent = '';

    // clear localStorage
    localStorage.clear();
});

setInterval(() => {
    time.innerText = new Date().toString().split(" ")[4]
}, 1000)
setInterval(() => {
    date.innerText = new Date().toString().slice(0, 15);
})

// search on google window.open() used
searchButton.addEventListener("click", () => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(googleTextarea.value)}`);
});

quotes_arr = [`No matter how many mistakes you make or how slow you progress, you are still way ahead of everyone who isn't trying. \n \n ~ Tonny Robbins`,
    `setting goals is the first step in turning the invisible into the visible. \n \n ~ Tonny Robbins`,
    `If you run into a wall, don't turn around and give up. Figure out how to climb it. \n \n ~ Michael Jordan`,
    `It's simple ... go the extra mile and you will stand out from the crowd. \n \n ~ Robin Crow`,
    `The only difference between dreams and achievements is hard work. \n \n ~ Chris Bollwage`,
    `You don't have to see the whole staircase, just take the first step. \n \n ~ Martin Luther King`,
    `It's not what we do once in a while that shapes our lives. It's what we do consistently. \n \n ~ Tony Robbins`]

motivation.innerText = quotes_arr[Math.floor(Math.random() * 7)]


// Event listern for to do list (main helper)
upper_tick_btn.addEventListener("click", () => {
    if (input_box.value == '') {
        alert('Enter the text');
    }
    else {
        let key = Date.now().toString();
        let values = input_box.value.trim();
        mainWorking(key, values);

        // set Item into local storage
        localStorage.setItem(key, values);

        input_box.value = '';
    }
});
