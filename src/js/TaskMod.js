/* /src/js/todo.js */

/*Author: Joshua E. Thomas
NOTE: Depends on jQuery and jQuery UI (for reordering ToDo entries*/

var TaskMod = (function() {
  var DOM = {};
  var listofToDos;
  var taskArray = []; //Array Model for storing ToDo objects 
  var taskViewOrder = []; //Array Model for storing view order of elements
      

  /* =================== private methods ================= */
  // cache DOM elements. Assumes id of parent div is 'todo' on main page.
  function cacheDom() {
    DOM.$todo = document.getElementById("todoList"); //parent div element
    // DOM.$listofToDos = initList();//$(document.createElement('ul')); unordered list of todos
    DOM.$todoCounter = $(document.createElement('p')); //shows remaining todos
    // DOM.$emptyToDo = $(document.createElement('input')); //allows adding more todos
    DOM.$showCompleted = $(document.createElement('button')); //shows completed todos
    //initList();

    //DOM.$todo.innerHTML = initList().outerHTML;
    DOM.$todo.appendChild(initList());

    //DOM.$todo.html = initList().outerHTML; //Why doesn't this work?
  }

    //Initialise the list object. Default is no todos unless specified via user prefs. All operations should take place in localStorage for persistence.
  function initList(){
    
    console.log("Initialising list");
    listofToDos = document.createElement('ul');
    listofToDos.setAttribute('id', 'taskList');
    listofToDos.className = "taskList";
    
    var dummy = document.createElement('li');
    dummy.className = "task";
   
    // var taskForm = document.createElement('form');
    // taskForm.className = "new-task-form";
    
    var blank = document.createElement('input');
    blank.setAttribute('id', 'blankTask');
    blank.setAttribute('type', 'text');
    blank.className = "form-control newtask";
    blank.setAttribute('placeholder', 'Add a new task...');
    blank.setAttribute('autocomplete', 'off');
    blank.addEventListener("keypress", bindNewTaskEvent);
    
    // taskForm.appendChild(blank);

    // dummy.appendChild(taskForm);
    dummy.appendChild(blank);

    listofToDos.appendChild(dummy);

    //Check if localStorage already has a task list. If not, create an empty task list. If it does, pull the task list. In either case, add it to a ul DOM element and return it so the DOM can be cached.
    if(localStorage.getItem("taskModel")&&(localStorage.getItem("taskViewOrder"))){

      
      taskArray = JSON.parse(localStorage.getItem("taskModel"));
      console.log(JSON.stringify(taskArray));
      
      taskViewOrder = JSON.parse(localStorage.getItem("taskViewOrder"));
      console.log(JSON.stringify(taskViewOrder));

      //console.log(listofToDos.outerHTML);

      //rebuild the tasks
      console.log("Rebuilding task tree");
      rebuildTaskView();
      console.log("Rebuild completed");
    } 

    console.log(listofToDos);

    //Make the task list sortable
    $("#taskList").sortable();
    $("#taskList").disableSelection();
   

    return listofToDos;
  }

  //Rebuild the task list from localstorage
  function rebuildTaskView() {

    //For each object in taskmodel, update the view element to the last known setting

    var i;

    console.log("Task view order length is " + taskViewOrder.length);
    for(i = 0; i < taskViewOrder.length; i++){
      
      var currID = taskViewOrder[i];
      
      console.log(JSON.stringify(taskArray[lookupTask(currID)]));
      // console.log(JSON.stringify(taskArray[lookupTask(currID)]));

      if(lookupTask(currID) != -1) {

        taskArray[lookupTask(currID)].render = renderToDo;
        taskArray[lookupTask(currID)].toggle = toggleToDo;
        taskArray[lookupTask(currID)].setDesc = setToDoDesc;
      } else {

        continue;
      }

      //console.log("Current task is: " + taskArray[lookupTask(currID)].render().outerHTML);

    //Set the event listeners of all checkbox, input and button elements based on class name via render()
      listofToDos.appendChild(taskArray[lookupTask(currID)].render());
      $("#taskList").sortable();

    }
    

    


  }


  // Save task list model and view
  function saveList() {

    localStorage.setItem("taskModel", JSON.stringify(taskArray));
    localStorage.setItem("taskViewOrder", JSON.stringify(taskViewOrder));
  }

  //Bind task addition to the enter key
  function bindNewTaskEvent(e){

    
    //on detecting the enter keystroke, get the value of the input element and pass to addToDo()
    
    var key = e.which || e.keyCode;

    if (key === 13) { // 13 is enter
      e.preventDefault();
      //alert("Keystroke detected");
      // Run addToDo using the object's value
      blankTask = document.getElementById("blankTask");
      //alert("Value of new task is " + blankTask.value);
      addToDo(blankTask.value);
      blankTask.value="";
    }

      console.log("In form submit");
      //on detecting the enter keystroke, get the value of the input element and pass to addToDo()
      // alert("Keystroke detected");
      
      // blankTask = document.getElementById("blankTask");
      // addToDo(blankTask.val);

      //return false;

    
  }

  //Bind task movement to regenerate view order
  function bindTaskMoveEvent(e){

    //Reset the task view list
    taskViewOrder = [];    
    var i;

    //Get all li elements associated with our task list
    var list = listofToDos.getElementsByTagName("li");
    console.log(JSON.stringify(list));
    for(i=1; i < list.length; i++){

      //Push the id of each task onto the view array
      console.log("Pushing ID " + list[i].id + " onto view order");
      taskViewOrder.push(list[i].id);
    }

    console.log("New view order is " + JSON.stringify(taskViewOrder));

    saveList();

  } 

  function bindCompletionEvent(e){

    //on marking a todo as completed we should set its state and strikeout its description

    e.preventDefault();

    //Get the next sibling of the checkbox to grab the input element
    var parentTask = e.target.nextSibling;

    console.log("Associated input is " + parentTask.id);    

    //Verify the state of the target, and add/remove any event bindings necessary along with the completed class
    if(e.target.checked){

      //alert("Completion triggered");

      parentTask.removeEventListener("click", bindEditToDoEvent);
      
      parentTask.classList.add("completed");

    } else{

      //alert("Uncompletion triggered");

      parentTask.addEventListener("click", bindEditToDoEvent);
      
      parentTask.classList.remove("completed");
    }
    
    //Set completion state on the target task and update the taskArray model

    // console.log("Task ID is " + parentTask.parentNode.id);
    // console.log("Before" + JSON.stringify(taskArray));
    taskArray[lookupTask(parentTask.parentNode.id)].toggle();
    // console.log("After" + JSON.stringify(taskArray));
    //console.log("Task Array obect completion state is " + taskArray[lookupTask(parentTask.parentNode.id)].completed);

    //Save the tasklist to localStorage
    saveList();

  }

  function bindTaskRemovalEvent(e){

    //on clicking the remove button we should delete the task from the listoftoDos
    e.preventDefault();

    removeToDo(e);
    return false;
  }


  function bindShowCompletedEvent(e){

    //when the show completed button is clicked it should either set completed tasks to display:none or vice versa.
  }

  function bindEditToDoEvent(e){

    //when a ToDo's description is clicked, it should become editable

    e.preventDefault();

    //Get the element that was clicked on
    var parentTask = e.target;
    //console.log("Edit event fired for " + parentTask.id);

    //Add the editing class
    parentTask.classList.add("editing");

    //remove the listener for the click event while editing--we will add this back once editing is done.
    parentTask.removeEventListener("click", bindEditToDoEvent);

    //Set the field to editable
    parentTask.readOnly = false;

    
  }

  function bindDoneEditingEvent(e){

    //when the Enter keystroke is detected in a task being edited, it should cease to be editable

    var key = e.which || e.keyCode;

    if (key === 13) { // 13 is enter
      e.preventDefault();
      //alert("Keystroke detected");

      //get target element
      var parentTask = e.target;

      //Set field to being uneditable
      parentTask.readOnly = true;

      //Remove the editing class
      parentTask.classList.remove("editing");

      //Rebind click handler
      parentTask.addEventListener("click", bindEditToDoEvent);
      
      //Retrieve and set the associated task object's new description
      taskArray[lookupTask(parentTask.parentNode.id)].setDesc(parentTask.value);

      //Save the task list to local storage
      saveList();

    }
  }

  //Toggle ToDo completed  or not. This should be assigned to the ToDo object
  function toggleToDo(){

    this.completed = this.completed ? 0 : 1;

  }

  //Alter a ToDo's description
  function setToDoDesc(newdesc){

    this.desc = newdesc;
  }

  //Write out a ToDo object in plain HTML
  function renderToDo(){

    //Set up the top level li
    var taskItem = document.createElement('li');
    taskItem.setAttribute("id", this.id);
    taskItem.className = "ui-state-default task";
    taskItem.addEventListener("drop", bindTaskMoveEvent);

    //$(this.id).draggable();
    
    //Set up the task completed checkbox and bind the completion event
    var taskCmpBtnId = "cmp" + this.id;
    var taskCmpBtn = document.createElement('input');
    taskCmpBtn.setAttribute("type", "checkbox");
    taskCmpBtn.setAttribute("id", taskCmpBtnId);
    taskCmpBtn.className = "taskCheckBox";
    //Check state of the task and marked checked if necessary
    if(this.completed){
      taskCmpBtn.checked = true;
    }
    taskCmpBtn.addEventListener("change", bindCompletionEvent);

    //Set up the task input and bind the edit event
    var taskInputId = "inp" + this.id;
    var displayTask = document.createElement('input');
    displayTask.setAttribute("id", taskInputId);
    displayTask.setAttribute("type", "text");
    displayTask.value = this.desc;
    displayTask.setAttribute("readonly", "true");//displayTask.readOnly = true apparently you can only set this when the attribute is dropped in with setAttribute
    displayTask.setAttribute("autocomplete", "off");
    displayTask.className = "taskDesc";
    //Check state of the task and strikeout text if necessary. Also conditionally bind edit event
    if(this.completed){
      displayTask.classList.add("completed");
    }else{

    displayTask.addEventListener("dblclick", bindEditToDoEvent);
    }
    displayTask.addEventListener("keypress", bindDoneEditingEvent);
    
    //Set up the trash function and bind the delete event
    var taskDelBtnID = "del" + this.id;
    var taskDelBtn = document.createElement('button');
    taskDelBtn.setAttribute("id", taskDelBtnID);
    taskDelBtn.className = "taskTrash";
    taskDelBtn.innerHTML = "<i class='fa fa-trash-o' aria-hidden='true'></i>";
    taskDelBtn.addEventListener("click", bindTaskRemovalEvent);

    //Append all children
    taskItem.appendChild(taskCmpBtn);
    taskItem.appendChild(displayTask);
    taskItem.appendChild(taskDelBtn);

    return taskItem;

  }

  //Define ToDo object, attrs and methods 
  function ToDo(name){

    var created;
    var id;
    var desc;
    var completed;
    var toggle;
    var setDesc;
    var render;

    this.id = Math.floor(Date.now());
    //this.id = created; //set ID to time of creation
    this.desc = name;
    this.completed = 0;
    this.toggle = toggleToDo;
    this.setDesc = setToDoDesc; 
    this.render = renderToDo;

  }


  //Add a todo manually
  function addToDo(name){

    //Create a new todo
    var task = new ToDo(name);

    console.log(JSON.stringify(task));
    
    //Render the new todo
    var taskRendered = task.render();
    console.log(taskRendered.innerHTML);  

    //Add the new todo in the eq(2) position of listofTodos
    listofToDos.appendChild(taskRendered);
    
    //Add the new todo to existing model array for future lookups
    taskArray.push(task);

    //Push the task ID to the taskViewOrder
    taskViewOrder.push(task.id);

    $("#taskList").sortable();

    //Save the task list to local storage
    saveList();

  }

  //Import todos from an external source
  function importToDos(src){


  }

  //Given an ID of a task <li> element, look up a ToDo object in the task array and return its index
  function lookupTask(id){

    var taskIndex = -1;

    for(i=0; i < taskArray.length; i++){

      if(taskArray[i].id == id){

        taskIndex = i;
        return taskIndex;
      }

    }

    return taskIndex; //Return -1 to caller if task not found...
  }

  //Remove undefined references from array to enable clean interation
  function cleanUpTasks(){

    taskArray = taskArray.filter(function(taskModel){

      if(taskModel!== undefined){

        return true;
      }

      return false;
    });

    taskViewOrder = taskViewOrder.filter(function(taskView){

      if(taskView!== undefined){

        return true;
      }

      return false;
    });
  }


  //Remove a todo
  function removeToDo(evt){

    //Get a reference to the parent <li> whose close button was clicked
    var parentTaskID = evt.target.parentNode.parentNode.id;

    console.log(parentTaskID);

    //Remove the li element from the parent <ul> listofToDos
    var parentTask = document.getElementById(parentTaskID);
    parentTask.parentNode.removeChild(parentTask);

    //Lookup and remove the associated task from the task array and view Order
    
    var delTaskID = lookupTask(parentTaskID);
    delete taskArray[delTaskID];
    delete taskViewOrder[delTaskID];

    //Reload taskArray to remove 'undefined' references
    cleanUpTasks();

    //Save the task list to local storage
    saveList(); 
  }


  //Keep track of the number of outstanding todos

  //Congratulate user


  
  // render DOM
  function displayToDoList() {
    //DOM.$todo.html = initList();

    /*var elem = document.getElementById("todoList");
    elem.innerHTML = initList().outerHTML;

    console.log(elem);*/
  }

  /* =================== public methods ================== */
  // main init method
  function init() {
    cacheDom();

    //console.log("Just cached DOM");

   
  }

/* =============== export public methods =============== */
  return {
    init: init
    //displayToDoList: displayToDoList
  };
}());