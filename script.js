const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completeCounter = document.getElementById("complete-counter");
const incompleteCounter = document.getElementById("incomplete-counter");

function updateCounters() {
  const completeTasks = document.querySelectorAll(".completed").length;
  const incompleteTasks = document.querySelectorAll("li:not(.completed)").length;
  completeCounter.textContent = completeTasks;
  incompleteCounter.textContent = incompleteTasks;
}

function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
    `;

  listContainer.appendChild(li);

  // clear the input field
  inputBox.value = " ";

  // attach event listeners to the new task
  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("span");
  const deleteBtn = li.querySelector(".delete-btn");

  //check feature
  checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  //edit feature
  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
      taskSpan.textContent = update;
      li.classList.remove("completed");
      checkbox.checked = false;
      updateCounters();
    }
  });

  //delete feature
  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });
  updateCounters();
}

inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
