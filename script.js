const taskItems = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];
console.log(taskItems);
let date = new Date();
console.log(date);
date = date.toString().split(" ");

const todayDateTime = date[2] + " " + date[1] + " " + date[3] + " " + date[4];
document.querySelector("#todayDate").innerHTML = todayDateTime;

function addTask() {
  document.querySelector("#add").addEventListener("click", () => {
    const taskName = document.querySelector("#taskName").value;
    console.log(taskName);
    if (taskName === "" || taskName === null) {
      alert("Please enter task name");
    } else {
      const task = {
        id: Math.floor(Math.random() * 10000),
        name: taskName,
        date: todayDateTime,
      };
      taskItems.unshift(task);
      localStorage.setItem("tasks", JSON.stringify(taskItems));
      alert("task add successfully");
      console.log(taskItems);
      location.reload();
    }
  });
}
function searchTask() {
  document.querySelector("#search").addEventListener("click", () => {
    const taskName = document.querySelector("#taskName").value;
    console.log(taskName);
    const searchWords = taskName.split(" ").map((word) => word.toLowerCase());
    const matchingTasks = taskItems.filter((task) =>
      searchWords.every((word) => task.name.toLowerCase().includes(word))
    );

    if (matchingTasks.length === 0) {
      alert("task not found");
    } else {
      alert("task found");
      taskData.innerHTML = "";
      matchingTasks.forEach((e) => {
        const items = `
            <div class="task">
                <div id="tasklist">
                    <div>
                        <p>${e.name}</p>
                        <p>${e.date}</p>
                    </div>
                    <div>
                        <p><a href="#" onclick=updateFunction(${e.id})>Edit</a></p>
                        <p><a href="#" onclick=deleteFunction(${e.id})>Delete</a></p>
                    </div>
                </div>
            </div> `;

        taskData.innerHTML += items;
      });
    }
  });
}

function allTasks() {
  const taskData = document.querySelector("#taskData");
  taskData.innerHTML = "";
  taskItems.forEach((e) => {
    const items = `
            <div class="task">
                <div id="tasklist">
                    <div>
                        <p>${e.name}</p>
                        <p>${e.date}</p>
                    </div>
                    <div>
                        <p><a href="#" onclick=updateFunction(${e.id})>Edit</a></p>
                        <p><a href="#" onclick=deleteFunction(${e.id})>Delete</a></p>
                    </div>
                </div>
            </div> `;

    taskData.innerHTML += items;
  });
}
function deleteFunction(id) {
  // console.log(id);
  const index = taskItems.findIndex((task) => task.id == id);
  if (index !== -1) {
    taskItems.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskItems));
    location.reload();
  }
}
function updateFunction(id) {
  // console.log(id);
  const index = taskItems.filter((task) => task.id == id);
  const updateData = prompt("enter a value", index[0]["name"]);
  if (updateData !== null) {
    index[0]["name"] = updateData;
    index[0]["date"] = todayDateTime;
    localStorage.setItem("tasks", JSON.stringify(taskItems));
    location.reload();
  }
}

window.onload = function () {
  allTasks();
  addTask();
  searchTask();
};

//     document.addEventListener("keydown", function (event){
//     if (event.ctrlKey){
//        event.preventDefault();
//     }
//     if(event.keyCode == 123){
//        event.preventDefault();
//     }
// });
// document.addEventListener('contextmenu',
//      event => event.preventDefault()
// );
