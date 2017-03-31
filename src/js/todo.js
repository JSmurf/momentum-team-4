/* /src/js/todo.js */

/*Author: Joshua E. Thomas
NOTE: Depends on jQuery and jQuery UI (for reordering ToDo entries*/

var ToDo = (function() {
  var DOM = {};
  var list; 
      

  /* =================== private methods ================= */
  // cache DOM elements. Assumes id of parent div is 'todo' on main page.
  function cacheDom() {
    DOM.$todo = $('#todo'); //parent div element
    DOM.$listofToDos = $(document.createElement('ul')); //unordered list of todos
    DOM.$todoCounter = $(document.createElement('p')); //shows remaining todos
    DOM.$emptyToDo = $(document.createElement('input')); //allows adding more todos
    DOM.$showCompleted = $(document.createElement('button')); //shows completed todos
  }

  //Bind task addition to the enter key in DOM.$emptyToDo
  function bindNewTaskEvent(){

    //on detecting the enter keystroke, get the value of the input element and pass to addToDo()
  }

  function bindCompletionEvent(){

    //on marking a todo as completed we should set its state and strikeout its description
  }

  function bindTaskRemovalEvent(){

    //on clicking the remove button we should delete the task from the listoftoDos
  }


  function bindShowCompletedEvent(){

    //when the show completed button is clicked it should either set completed tasks to display:none or vice versa.
  }

  function bindEditToDoEvent(){

    //when a ToDo's description is clicked, it should become editable
  }

  function bindDoneEditingEvent(){

    //when the Enter keystroke is detected in a task being edited, it should cease to be editable
  }

  //Toggle ToDo completed  or not. This should be assigned to the ToDo object
  function toggleToDo(){

    this.completed = completed ? 0 : 1;

  }

  function setToDoDesc(var newdesc){

    this.desc = newdesc;
  }


  //Define todo objects, attrs and methods 
  function ToDo(var name){

    var desc;
    var completed;

    this.desc = name;
    this.completed = 0;
    this.toggle = toggleToDo;
    this.setDesc = setToDoDesc; 

  }



  //Initialise the list object. Default is no todos unless specified via user prefs.
  function initList(){

  }

  //Add a todo manually
  function addToDo(var name){



  }

  //Import todos
  function importToDos(var src){


  }

  

  //Edit a ToDo

  //Remove a todo

  //Keep track of the number of outstanding todos

  //Congratulate user


  
  // render DOM
  function displayToDoList() {
    DOM.$todo
      .html = "";
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