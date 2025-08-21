// Real chat logic for home page (AI + Socket.io)

document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose'); // close button

    // ✅ Connect to Socket.IO server
    const socket = io("http://localhost:3000"); // change URL if deployed

    // Append messages
    function appendMessage(text, sender = 'user') {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle form submit (user sends message)
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userMsg = chatInput.value.trim();
        if (!userMsg) return;

        // Show user message in chat
        appendMessage(userMsg, 'user');
        chatInput.value = '';

        // Send to backend AI service
        socket.emit('ai-message', userMsg);

        // Show "typing..." placeholder while waiting
        appendMessage("...", 'bot-typing');
    });

    // ✅ Listen for AI response
    socket.on('ai-response', function(data) {
        // Remove "typing..." placeholder if present
        const typingMsg = chatMessages.querySelector('.bot-typing');
        if (typingMsg) typingMsg.remove();

        // Show actual AI message
        appendMessage(data, 'bot');
    });

    // Sidebar toggle (mobile)
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function (e) {
            e.stopPropagation(); 
            sidebar.classList.add('open');
        });
    }

    // Sidebar close button
    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', function (e) {
            e.stopPropagation();
            sidebar.classList.remove('open');
        });
    }

    // Close sidebar when clicking outside (mobile UX)
    document.addEventListener('click', function (e) {
        if (
            sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            e.target !== sidebarToggle
        ) {
            sidebar.classList.remove('open');
        }
    });

    chatInput.focus();
});
