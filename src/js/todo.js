/* /src/js/todo.js */

/*Author: Joshua E. Thomas
NOTE: Depends on jQuery and jQuery UI (for reordering ToDo entries*/

var TaskMod = (function() {
  var DOM = {};
  var listofToDos;
  var taskArray = []; //Array Model for storing ToDo objects 
      

  /* =================== private methods ================= */
  // cache DOM elements. Assumes id of parent div is 'todo' on main page.
  function cacheDom() {
    DOM.$todo = $('#todo'); //parent div element
    DOM.$listofToDos = initList();//$(document.createElement('ul')); unordered list of todos
    DOM.$todoCounter = $(document.createElement('p')); //shows remaining todos
    // DOM.$emptyToDo = $(document.createElement('input')); //allows adding more todos
    DOM.$showCompleted = $(document.createElement('button')); //shows completed todos
  }

  //Bind task addition to the enter key
  function bindNewTaskEvent(e){

    //on detecting the enter keystroke, get the value of the input element and pass to addToDo()
  }

  function bindCompletionEvent(e){

    //on marking a todo as completed we should set its state and strikeout its description
  }

  function bindTaskRemovalEvent(e){

    //on clicking the remove button we should delete the task from the listoftoDos
  }


  function bindShowCompletedEvent(e){

    //when the show completed button is clicked it should either set completed tasks to display:none or vice versa.
  }

  function bindEditToDoEvent(e){

    //when a ToDo's description is clicked, it should become editable
  }

  function bindDoneEditingEvent(e){

    //when the Enter keystroke is detected in a task being edited, it should cease to be editable
  }

  //Toggle ToDo completed  or not. This should be assigned to the ToDo object
  function toggleToDo(){

    this.completed = completed ? 0 : 1;

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

    //Set up the task completed checkbox and bind the completion event
    var taskCmpBtnId = "cmp" + this.id;
    var taskCmpBtn = document.createElement('input');
    taskCmpBtn.setAttribute("type", "checkbox");
    taskCmpBtn.setAttribute("id", taskCmpBtnId);
    taskCmpBtn.addEventListener("click", bindCompletionEvent);

    //Set up the task input and bind the edit event
    var displayTask = document.createElement('input');
    displayTask.setAttribute("type", text);
    displayTask.value = this.desc;
    displayTask.addEventListener("click", bindEditToDoEvent);
    
    //Set up the trash function and bind the delete event
    var taskDelBtnID = "del" + this.id;
    var taskDelBtn = document.createElement('button');
    taskDelBtn.setAttribute("id", taskDelBtnID);
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

    this.created = Math.floor(Date.now());
    this.id = created; //set ID to time of creation
    this.desc = name;
    this.completed = 0;
    this.toggle = toggleToDo;
    this.setDesc = setToDoDesc; 
    this.render = renderToDo;

  }



  //Initialise the list object. Default is no todos unless specified via user prefs. All operations should take place in localStorage for persistence.
  function initList(){
    
    listofToDos = document.createElement('ul');
    listofToDos.setAttribute('id', 'taskList');
    var dummy = document.createElement('li');
    dummy.className = "task";
    dummy.innerHTML = "<input placeholder='Add a new task...'/>";
    listofToDos.appendChild(dummy);

    //Check if localStorage already has a task list. If not, create an empty task list. If it does, pull the task list. In either case, add it to a ul DOM element and return it so the DOM can be cached.
    if(localStorage.getItem("taskList")){

      var i;
      var taskList;
      taskList = localStorage.getItem("taskList");
      listofToDos.innerHTML = taskList;
    } 


    return listofToDos;
  }

  //Update the task list stored in the browser for every addition, completion, or deletion action
  function saveTaskListLocal(){

  }

  //Add a todo manually
  function addToDo(name){

    //Create a new todo
    var task = new ToDo(name);
    
    //Render the new todo
    var taskRendered = task.renderToDo;

    //Add the new todo in the eq(2) position of listofTodos
    listofToDos.insertBefore(taskRendered, listofToDos.childNodes[1]);
    
    //Add the new todo to existing model array for future lookups
    taskArray.push(task);

    //Save the task list to local storage

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

    taskArray = taskArray.filter(function(task){

      if(task!== undefined){

        return true;
      }

      return false;
    });
  }


  //Remove a todo
  function removeToDo(){

    //Get a reference to the parent <li> whose close button was clicked
    var parentTaskID = this.parentNode.id;

    //Remove the li element from the parent <ul> listofToDos
    var parentTask = document.getElementByID(parentTaskID);
    parentTask.parentNode.removeChild(parentTask);

    //Lookup and remove the associated task from the task array
    delete taskArray[lookupTask(parentTaskID)];

    //Reload taskArray to remove 'undefined' references
    cleanUpTasks();

    //Save the task list to local storage 
  }


  //Keep track of the number of outstanding todos

  //Congratulate user


  
  // render DOM
  function displayToDoList() {
    DOM.$todo
      .html = DOM.listofToDos;
  }

  /* =================== public methods ================== */
  // main init method
  function init() {
    cacheDom();
  }

/* =============== export public methods =============== */
  return {
    init: init,
    displayToDoList: displayToDoList
  };
}());