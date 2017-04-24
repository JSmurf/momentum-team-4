/* /src/js/greeting.js */

/*Author: Joshua E. Thomas
NOTE: Depends on jQuery and jQuery UI (for reordering ToDo entries*/

var Greeting = (function(){

	'use strict';
	
	// placeholder for cached DOM elements
	var DOM = {};
	var name; //Stores the user's name
	var tod; //Stores the time of day (morning, afternoon, evening--night is not a greeting)
	var time; //Stores time
	var focus; //Stores main task

	/* =================== private methods ================= */
	// cache DOM elements
	function cacheDom() {
	DOM.$center = $('#middle'); //Get the div in center of the CSS grid
	DOM.$date = $('.date');
	DOM.$greeting = $('.greeting');
	DOM.$time = $('.time');
	DOM.$focus = $('.focus');
	DOM.$focusInput = $('#focus-input');
	DOM.$hours = $('.hours');
	DOM.$ap = $('.ap');

	console.log("Finished caching DOM, now rendering components");

	renderTimeandDate();
	renderGreeting();
	renderMainTask();
	
	}



	function bindUserName(e){

		var key = e.which || e.keyCode;
    	
		//Get the user's name from the nameInput control
		if (key === 13) { // 13 is enter
			e.preventDefault();

			var nameInput = document.getElementById("nameInput");

			var user = nameInput.value;

			//Save name to localStorage and show greeting
			localStorage.setItem("username", user);
			DOM.$greeting.html("Good " + tod + ", " + user + ".");

			//Render main focus query
			renderMainTask();
	      
	    }


	}

	function bindMainFocus(e){

		var key = e.which || e.keyCode;
    	
		//Get the user's main focus from the focusInput control
		if (key === 13) { // 13 is enter
			e.preventDefault();

			var query = document.getElementById('focus-header');

			var focusInput = document.getElementById("focusInput");

			var mainTask = document.getElementById("mainTask");

			query.innerHTML = "Today";

			var focus = focusInput.value;

			//Save focus to localStorage and display edit icon
			localStorage.setItem("focus", focus);
			
			//focusInput.setAttribute("readonly", true);
			focusInput.removeEventListener("keypress", bindMainFocus);
			focusInput.style.display = "none";

			//Create a ToDo and add it in
			mainFocusHelper(focus, mainTask);

			mainTask.style.display = "inline-block";




			

			
	      
	    }

	}

	function bindEditMainFocus(e){

		e.preventDefault();

		var focusInput = document.getElementById("focusInput");
		focusInput.classList.remove("focusEdited");
		focusInput.setAttribute("readonly", false);
		focusInput.addEventListener("keypress", bindMainFocus);
		$("#editBtn").remove();

	}

	function setTOD(hour){

		if((hour >= 0) && (hour < 12)){

			tod = "morning";
		}else if(hour < 18){

			tod = "afternoon";
		} else {

			tod = "evening";
		}
	}

	function renderGreeting() {

		//Check if the user's name is already in localStorage. if it is, go straight to displaying the greeting

		//If it isn't, then query for the name, save state to localStorage, and then display the greeting

		// DOM.$greeting.text("Some Greeting");

		var user = localStorage.getItem("username");

		if(!user){

			var msg = "Hello, what's your name?";

			var nameInput = document.createElement('input');
			nameInput.setAttribute("id", "nameInput");
			nameInput.setAttribute("type", "text");
			nameInput.className = "form-control";
			nameInput.addEventListener("keypress", bindUserName);
			//nameInput.setAttribute("readonly", false);
			nameInput.autofocus = true;
			DOM.$greeting.append(msg);
			DOM.$greeting.append(nameInput);
		}else {

			DOM.$greeting.html("Good " + tod + ", " + user);
		}



	
	}

	function renderMainTask() {

		//Check if the user's focus is already in localStorage. If it is, display it

		//If it isn't, then query for the task, save state to localStorage, and then display the main focus

		// DOM.$focusInput.val("Some focus");
		var user = localStorage.getItem("username");
		var mainFocus = localStorage.getItem("focus");

		var query = document.createElement('p');
		query.setAttribute("id", "focus-header");

		var focusInput = document.createElement('input');
		focusInput.setAttribute("id", "focusInput");
		//focusInput.setAttribute("placeholder", msg);
		focusInput.className = "form-control";
		focusInput.style.display = "block";
		focusInput.addEventListener("keypress", bindMainFocus);

		var mainTask = document.createElement('div');
		mainTask.setAttribute("id", "mainTask");

		if(user){

			if(!mainFocus){

				var msg = "What is your main focus for today?";

				query.innerHTML = msg;

				mainTask.style.display= "none";

								

			}else {

				query.innerHTML ="Today";
				DOM.$focus.append(query);

				focusInput.style.display = "none";

				mainFocusHelper(mainFocus, mainTask);

			}

			DOM.$focus.append(query);
			DOM.$focus.append(focusInput);
			DOM.$focus.append(mainTask);
		}

	
	}

	//Focus helper takes a task and a div element and constructs the display 
	function mainFocusHelper(task, mainTask){

		//Set up the task completed checkbox and bind the completion event
	    var mainCmpBtnId = "mainTaskCheckbox";
	    var taskCmpBtn = document.createElement('input');
	    taskCmpBtn.setAttribute("type", "checkbox");
	    taskCmpBtn.setAttribute("id", mainCmpBtnId);
	    taskCmpBtn.className = "taskCheckBox";
	    //Check state of the task and marked checked if necessary
	   /* if(this.completed){
	      taskCmpBtn.checked = true;
	    }*/
	    //taskCmpBtn.addEventListener("change", bindCompletionEvent);

	    //Set up the task input and bind the edit event
	    var mainInputId = "mainTaskInput";
	    var displayTask = document.createElement('span');
	    displayTask.setAttribute("id", mainInputId);
	    //displayTask.setAttribute("type", "text");
	    //displayTask.value = task;
	    displayTask.innerHTML = task;
	    //displayTask.setAttribute("readonly", "true");//displayTask.readOnly = true apparently you can only set this when the attribute is dropped in with setAttribute
	    //displayTask.setAttribute("autocomplete", "off");
	    displayTask.className = "taskDesc";
	    //Check state of the task and strikeout text if necessary. Also conditionally bind edit event
	   /* if(this.completed){
	      displayTask.classList.add("completed");
	    }else{

	    //displayTask.addEventListener("dblclick", bindEditToDoEvent);
	    }*/
	    //displayTask.addEventListener("keypress", bindDoneEditingEvent);
	    
	    //Set up the trash function and bind the delete event
	    var mainDelBtnID = "mainTaskTrash";
	    var taskDelBtn = document.createElement('button');
	    taskDelBtn.setAttribute("id", mainDelBtnID);
	    taskDelBtn.className = "taskTrash";
	    taskDelBtn.innerHTML = "<i class='fa fa-trash-o' aria-hidden='true'></i>";
	    //taskDelBtn.addEventListener("click", bindTaskRemovalEvent);

	    mainTask.appendChild(taskCmpBtn);
	    mainTask.appendChild(displayTask);
	    mainTask.appendChild(taskDelBtn);
	}

	function renderTimeandDate() {

		//Render date and real time clock, leveraging the setTimeout function

		var date = new Date();

	    // Format day/month/year to two digits
	    var formattedDate = ('0' + date.getDate()).slice(-2);
	    var formattedMonth = ('0' + (date.getMonth() + 1)).slice(-2);
	    var formattedYear = date.getFullYear().toString().substr(2,2);

	    // Combine and format date string
	    var dateString = formattedMonth + '/' + formattedDate + '/' + formattedYear;

	    // Output dateString
	   	DOM.$date.html(dateString);

	   	//Manipulate date object to get time as well
	   	var hour = date.getHours();
	   	setTOD(hour);
	   	var minute = date.getMinutes();
		var amPM = (hour > 11) ? "pm" : "am";
		
		if(hour > 12) {

			hour -= 12;
		} else if(hour == 0) {
		
			hour = "12";
		}
		if(minute < 10) {
		
			minute = "0" + minute;
		}
		
		DOM.$hours.html(hour + ":" + minute);
		DOM.$ap.html(amPM);

		var t = setTimeout(renderTimeandDate,1000);

		

	}



	/* =================== public methods ================== */
	// main init method
	function init() {
	cacheDom();
	//bindEvents();
	}

	/* =============== export public methods =============== */


	return {
		init: init
	};
}());