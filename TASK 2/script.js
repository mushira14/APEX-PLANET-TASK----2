document.addEventListener("DOMContentLoaded", () => {
  // ----- Contact Form (handles formMessage OR formMsg) -----
  const contactForm = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMessage") || document.getElementById("formMsg");

  if (contactForm && formMsg) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      formMsg.textContent = "Form submitted successfully ✅";
      formMsg.style.color = "green";
      contactForm.reset();
    });
  }
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const addBtn =
    document.querySelector("#todo .todo-input button") ||
    document.getElementById("addTaskBtn");
  if (addBtn && addBtn.type !== "button") addBtn.type = "button";
  let taskCounter = document.getElementById("taskCounter");
  if (!taskCounter && taskList) {
    taskCounter = document.createElement("p");
    taskCounter.id = "taskCounter";
    taskList.insertAdjacentElement("afterend", taskCounter);
  }
  let taskCount = taskList ? taskList.querySelectorAll("li").length : 0;

  const updateCounter = () => {
    if (taskCounter) taskCounter.textContent = `Total Tasks: ${taskCount}`;
  };

  const makeRemoveButton = (li) => {
    const delBtn = document.createElement("button");
    delBtn.textContent = "Remove";
    delBtn.addEventListener("click", () => {
      li.remove();
      taskCount = Math.max(0, taskCount - 1);
      updateCounter();
    });
    return delBtn;
  };

  const addTaskImpl = () => {
    if (!taskInput || !taskList) return;

    const text = taskInput.value.trim();
    if (!text) {
      // Optional gentle nudge; comment out if undesired
      // alert("⚠️ Please enter a task before adding.");
      return;
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    const delBtn = makeRemoveButton(li);

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);

    taskCount += 1;
    updateCounter();

    taskInput.value = "";
    taskInput.focus();
  };

  // Support inline HTML: onclick="addTask()"
  window.addTask = addTaskImpl;

  // Also wire the button and Enter key
  if (addBtn) addBtn.addEventListener("click", addTaskImpl);
  if (taskInput) {
    taskInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTaskImpl();
      }
    });
  }

  // Initial counter paint
  updateCounter();
});
