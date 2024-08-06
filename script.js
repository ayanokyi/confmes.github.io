const form = document.getElementById('nameForm');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get user name and validate
    const userName = document.getElementById('userName').value.trim();
    if (userName === "") {
        alert("enter your name 😡😡");
        return;
    }else if(/\d/.test(userName)) {
        alert("eh? it's a number, not a name");
        return;
    }
     else if (userName !== "Charrie" && userName !== "charrie" && userName !== "cha" && userName !== "Cha" && userName !== "rie" && userName !== "Rie") {
        alert("eh? that's not your name 😡😡");
        return;
    }

    const formattedUserName = userName.charAt(0).toUpperCase() + userName.slice(1);
    
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Send form data to the API
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        const jsonResponse = await response.json();
        if (response.ok) {
            alert("alright, here we go!");
            document.getElementById('greeting').textContent = `Hello, ${formattedUserName}!`;
            document.getElementById('confirmationModal').style.display = 'none';
            document.getElementById('mainContent').style.display = 'block';
        } else {
            console.log(response);
            result.innerHTML = jsonResponse.message;
        }
    })
    .catch(error => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
    })
    .finally(() => {
        form.reset();
        setTimeout(() => {
            result.style.display = "none";
        }, 3000);
    });
});

function toggleEnvelope() {
    const envelope = document.querySelector('.envelope');
    envelope.classList.toggle('open');
    const hint = document.querySelector('.hint');
    hint.style.opacity = envelope.classList.contains('open') ? '0' : '0.7';
    
    const music = document.getElementById('background-music');
    if (envelope.classList.contains('open')) {
        music.play();
    } else {
        music.pause();
        music.currentTime = 0; // Reset the audio to the beginning
    }
}
