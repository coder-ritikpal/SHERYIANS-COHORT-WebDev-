// Dummy chat logic for home page
// All chat functionality in one script

document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    const dummyReplies = [
        "Hey Ritik! 👋 How’s it going?",
        "I'm here to help you. What do you want to know?",
        "You can ask me anything!",
        "Let's build something awesome together.",
        "Sure, I can assist you with that.",
        "Here's a tip: Stay curious!"
    ];
    let replyIndex = 0;

    function appendMessage(text, sender = 'user') {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userMsg = chatInput.value.trim();
        if (!userMsg) return;
        appendMessage(userMsg, 'user');
        chatInput.value = '';
        setTimeout(() => {
            appendMessage(dummyReplies[replyIndex % dummyReplies.length], 'bot');
            replyIndex++;
        }, 700);
    });

    // Sidebar toggle for mobile
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });
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
    }

    chatInput.focus();
});
