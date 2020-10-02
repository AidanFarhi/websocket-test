const chatForm = document.getElementById('chat-form')
const socket = io()

// Message from server
socket.on('message', message => {
    outputMessage(message)
})

// Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault()
    // Grab message text from DOM
    const msg = e.target.elements.msg.value
    e.target.elements.msg.value = ''
    // Emit message to server
    socket.emit('chatMessage', msg)
})

// Output message to dom
const outputMessage = msg => {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `
        <p class='meta'> Aidan <span> 9:12pm </span></p>
        <p class='text'>
            ${msg}
        </p>
    `
    document.querySelector('.chat-messages').appendChild(div)
}