function addMessage(text, cls) {
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.innerText = text;
  document.getElementById("chat").appendChild(div);
}

async function send() {
  const input = document.getElementById("input");
  const text = input.value;

  if (!text) return;

  addMessage("Ты: " + text, "user");

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();

  addMessage("Uzbek AI: " + data.reply, "bot");

  input.value = "";
}

function newChat() {
  document.getElementById("chat").innerHTML = "";
}
