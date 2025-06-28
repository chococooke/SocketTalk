// Global State
let groups = [];
let currentGroup = null;
const baseUrl = `http://localhost:5000/api`;

document.addEventListener("DOMContentLoaded", () => {
  getUserGroups();
  groups = JSON.parse(localStorage.getItem("groups"));
  renderGroups();
});

// Groups rendering
const groupsDiv = document.getElementById("groups");
async function getUserGroups() {
  try {
    const res = await axios.get(`${baseUrl}/grp/my-groups`);
    localStorage.setItem("groups", JSON.stringify(res.data));

    groups = res.data;
  } catch (err) {
    console.error(err);
  }
}

function renderGroups() {
  groups.forEach((group, index) => {
    const li = document.createElement("li");
    li.textContent = group.name;
    li.style.border = `1px solid black`;

    li.addEventListener("click", (event) => {
      const prevActive = document.getElementById("group-active");
      if (!prevActive) {
        li.setAttribute("id", "group-active");
        currentGroup = index;
        renderMessages(currentGroup);
      } else {
        prevActive.removeAttribute("id");
        li.setAttribute("id", "group-active");
        currentGroup = index;
        renderMessages(currentGroup);
      }
    });

    groupsDiv.appendChild(li);
  });
}

// message Rendering
function renderMessages(groupIndex) {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";
  const currentMessageList = groups[groupIndex].Messages;

  if (currentMessageList.length === 0)
    messagesDiv.innerHTML = "Wow! such empty.";

  currentMessageList.forEach((message) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${message.User.username}:</strong> ${message.text}`;

    messagesDiv.appendChild(li);
  });
}

// send Message
const chatForm = document.getElementById("chat-form");
const chatText = document.getElementById("chat-text");

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const text = chatText.value;
    const message = await axios.post(
      `${baseUrl}/chat/send`,
      { text, groupId: groups[currentGroup].id },
      { withCredentials: true }
    );

    chatForm.reset();

    await getUserGroups();
    await renderMessages(currentGroup);
  } catch (err) {
    console.error(err);
  }
});
