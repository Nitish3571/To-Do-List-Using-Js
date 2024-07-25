const taskItems = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
console.log(taskItems);
let date = new Date()
console.log(date);
date = date.toString().split(' ');


const todayDateTime = date[2] + " " + date[1] + " " + date[3] + " " + date[4];
document.querySelector("#todayDate").innerHTML = todayDateTime;

function addTask() {
    document.querySelector('#add').addEventListener("click", () => {
        const taskName = document.querySelector('#taskName').value;
        console.log(taskName);
        if (taskName === '' || taskName === null) {
            alert("Please enter task name");
        }
        else {
            const task = { id: Math.floor(Math.random() * 10000), name: taskName, date: todayDateTime };
            taskItems.push(task);
            localStorage.setItem("tasks", JSON.stringify(taskItems));
            console.log(taskItems);
            location.reload();
        }
    })
}

function allTasks() {
    const taskData = document.querySelector('#taskData');
    taskData.innerHTML = '';
    taskItems.forEach(e => {
        const items = `
            <div class="task">
                <div id="tasklist">
                    <div>
                        <p>${e.name}</p>
                        <p>${e.date}</p>
                    </div>
                    <div>
                        <p><a href="#" >Edit</a></p>
                        <p><a href="#" onclick=deleteFunction(${e.id})>Delete</a></p>
                    </div>
                </div>
            </div> `;

        taskData.innerHTML += items;
    });

}
function deleteFunction(id) {
    console.log(id);
    const index = taskItems.findIndex(task => task.id == id);
    if (index !== -1) {
        taskItems.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(taskItems));
        location.reload();
    }
}

window.onload = function () {
    allTasks();
    addTask();
}

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
