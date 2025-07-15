document.addEventListener("DOMContentLoaded", () => {
    const socket = io({ autoConnect: false });

    const chatBtn = document.getElementById("chat-button");
    const chatBox = document.getElementById("chat-box");
    const userIdInput = document.getElementById("userId");

    if (!userIdInput || !userIdInput.value.trim()) return;
    const userId = userIdInput.value;

    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-chat");
    const messagesDiv = document.getElementById("chat-messages");

    let isConnected = false;

    chatBtn.addEventListener("click", () => {
        if (!isConnected) {
            socket.connect(); 
            socket.emit("joinRoom", userId);
            isConnected = true;
        }

        chatBox.style.display = (chatBox.style.display === "none" || chatBox.style.display === "") ? "block" : "none";
    });

    sendBtn.addEventListener("click", () => {
        const msg = chatInput.value.trim();
        if (msg) {
            socket.emit("userMessage", { userId, message: msg });
            chatInput.value = "";
        }
    });

    socket.on("newMessage", (data) => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${data.sender}:</strong> ${data.message}`;
        messagesDiv.appendChild(p);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
});

