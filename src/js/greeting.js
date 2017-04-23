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



	//Capture name of user 


	//Capture and display main task


	//Set and display time/time of day


	// // bind events
	// function bindEvents() {
	// DOM.$someElement.click(handleClick);
	// }
	// // handle click events
	// function handleClick(e) {
	// render(); // etc
	// }
	// render DOM elements

	function bindUserName(e){
		//Get the user's name from the nameInput control

		//Save name to localStorage

		//Render main focus query

		//Set the nameInput control as hidden and display proper greeting

		//Remove the keypress handler
	}

	function bindMainFocus(e){
		//Get the user's main focus from the focusInput control

		//Set the focusInput control as hidden and display main focus

		//Remove the keypress handler

		//Save main focus to localStorage
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
			nameInput.className = "form-control";
			nameInput.style.display = "block";
			nameInput.addEventListener("keypress", bindUserName);
			DOM.$greeting.html(msg);
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

		if(user){

			if(!mainFocus){

				var msg = "What is your main focus for today?";

				var focusInput = document.createElement('input');
				focusInput.setAttribute("id", "focusInput");
				focusInput.setAttribute("placeholder", msg);
				focusInput.className = "form-control";
				focusInput.style.display = "block";
				focusInput.addEventListener("keypress", bindMainFocus);
				DOM.$focus.append(focusInput);
			}else {

				DOM.$focus.html(mainFocus);
			}
		}

	
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