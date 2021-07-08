var task_number = 0;
var data_list = new Array();

function add_item(){
    let task = document.getElementById('new_task');
    let tasks_list = document.getElementById('task_list');
    let element = document.getElementById("empty_alert");
    if (task.value!=null && task.value.length>0){
        let new_task = document.createElement('div');
        tasks_list.appendChild(new_task);
        new_task.setAttribute('class', 'task_view d-flex flex-col justify-content-between list-group-item p-1');
        new_task.setAttribute('id', task_number);
        new_task.innerHTML = "<span id="+task_number+"_item"+">"+task.value+"</span><span><input type='button' class='button button-safe' value='&#10003;' data-toggle='tooltip' data-placement='bottom' title='Mark as done' onclick='mark_done(this)'><input type='button' class='button button-danger' value='&#10007;' data-toggle='tooltip' data-placement='bottom' title='Removes this task' onclick='remove_item(this)'></span>";
        data_list.push(document.getElementById(task_number+"_item").textContent);
        task_number++;
        task.value=null;
        if(element.classList.contains('show')){
            element.classList.toggle('show');
            element.classList.toggle('hide');
        }
    }else{
        if(element.classList.contains('hide')){
            element.classList.toggle('show');
            element.classList.toggle('hide');
        }
    }
}

function mark_done(item){
    var task = item.parentNode.parentNode.id+'_item';
    document.getElementById(task).classList.toggle("mark_done");
}

function remove_item(item){
    var task = item.parentNode.parentNode;
    removed_content = task.textContent;
    for(i = 0; i < data_list.length; i++){
        if(data_list[i] === removed_content){
            data_list.splice(i, 1);
        }
    }
    task.parentNode.removeChild(task);
}

// Clear entire task list
function clear_items(){
    let tasks_list = document.getElementById('task_list');
    tasks_list.innerHTML = "";
}

// This method is responsible fot changing theme
function change_theme(button){
    let theme = button.name;
    theme = (theme == "light")? "dark" : "light";
    document.getElementsByTagName('html')[0].dataset.theme = theme;
    button.name = theme;
}

function save_data(){
    var canvas = document.createElement('canvas').getContext('2d');
    canvas.canvas.height = data_list.length*30+15;
    canvas.canvas.width = 1280;
    canvas.fillStyle = "#ffffff";
    canvas.font = "30px Calibri";

    for(i=0; i<data_list.length; i++){
        canvas.fillText((i+1)+"."+data_list[i], 5, (i+1)*30);
    }

    // Prepare to download ToDo List
    var link = document.createElement('a');
    link.download = 'ToDo_List.jpeg';
    link.href = canvas.canvas.toDataURL("image/jpeg", 1.0);
    link.click();
}