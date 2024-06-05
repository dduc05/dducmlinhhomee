// Calculate the number of days from 02/05/2024 to today
const startDate = new Date('2024-05-02');
const currentDate = new Date();
const timeDifference = currentDate - startDate;
const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

if (document.getElementById('days-count')) {
    document.getElementById('days-count').innerHTML = `${daysDifference} <span>days</span>`;
}

let selectedEmotion = '';

// Update the emotion on the homepage
function updateEmotionOnHomepage(room, emotion) {
    const roomButton = document.getElementById(`${room}-button`);
    const emotionSpan = document.getElementById(`${room}-emotion`);
    if (roomButton && emotionSpan) {
        emotionSpan.textContent = getEmotionIcon(emotion);
    }
}

function getEmotionIcon(emotion) {
    switch (emotion) {
        case 'happy':
            return '😊';
        case 'sad':
            return '😢';
        case 'angry':
            return '😡';
        case 'love':
            return '❤️';
        default:
            return '';
    }
}

function enterRoom(password) {
    if (password === 'linhxinh') {
        window.location.href = 'room1.html';
    } else if (password === 'ducthoi') {
        window.location.href = 'room2.html';
    } else {
        alert('Incorrect password!');
    }
}

function selectEmotion(emotion, room) {
    selectedEmotion = emotion;
    localStorage.setItem(`${room}-emotion`, emotion);
    updateEmotionOnHomepage(room, emotion);
}

function sendMessage(room) {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value;
    if (messageText.trim() === '') {
        alert('Message cannot be empty!');
        return;
    }
    const messageTime = new Date().toLocaleString();
    const message = {
        id: Date.now(),
        text: messageText,
        time: messageTime,
        emotion: selectedEmotion
    };
    saveMessage(room, message);
    displayMessages(room);
    messageInput.value = '';
    selectedEmotion = ''; // Reset the selected emotion after sending a message
}

function saveMessage(room, message) {
    const messages = JSON.parse(localStorage.getItem(room)) || [];
    messages.push(message); // Add the new message to the end
    localStorage.setItem(room, JSON.stringify(messages));
}

function deleteMessage(room, messageId) {
    let messages = JSON.parse(localStorage.getItem(room)) || [];
    messages = messages.filter(msg => msg.id !== messageId);
    localStorage.setItem(room, JSON.stringify(messages));
    displayMessages(room);
}

function copyMessage(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Message copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function toggleOptionsMenu(entryDiv) {
    const optionsMenu = entryDiv.querySelector('.options-menu');
    optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
}

function displayMessages(room) {
    const messages = JSON.parse(localStorage.getItem(room)) || [];
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = '';

    messages.reverse().forEach(msg => { // Display messages from bottom to top
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');
        entryDiv.textContent = msg.text;

        const timestampDiv = document.createElement('div');
        timestampDiv.classList.add('timestamp');
        timestampDiv.textContent = msg.time;

        const optionsButton = document.createElement('button');
        optionsButton.classList.add('options-button');
        optionsButton.textContent = '...';
        optionsButton.onclick = () => toggleOptionsMenu(entryDiv);

        const optionsMenu = document.createElement('div');
        optionsMenu.classList.add('options-menu');
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.onclick = () => copyMessage(msg.text);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteMessage(room, msg.id);

        optionsMenu.appendChild(copyButton);
        optionsMenu.appendChild(deleteButton);

        entryDiv.appendChild(timestampDiv);
        entryDiv.appendChild(optionsButton);
        entryDiv.appendChild(optionsMenu);

        entriesDiv.appendChild(entryDiv);
    });
    entriesDiv.scrollTop = entriesDiv.scrollHeight; // Scroll to the bottom
}

// Handle keypress for sending message with Enter key
function handleKeyPress(event, room) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage(room);
    }
}

// Password check for login
function checkPassword() {
    const passwordInput = document.getElementById('password').value;
    const correctPassword = 'linhxinhducthoi';
    const errorMessage = document.getElementById('error-message');

    if (passwordInput === correctPassword) {
        window.location.href = 'home.html';
    } else {
        errorMessage.style.display = 'block';
    }
}

// Trigger checkPassword on Enter key press
document.getElementById('password').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkPassword();
    }
});

// Function to go back to the homepage
function goToHomePage() {
    window.location.href = 'home.html';
}







