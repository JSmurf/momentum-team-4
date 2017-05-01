var Calendar = (function() {

	'use strict';

	var today = new Date().getTime();
	var eventArr = [];

	function startup(){
		if (localStorage.getItem("calendar") == []) {
			localStorage.setItem("calendar", eventArr);
		} else {

			//console.log("Seems calendar exists");
	 	eventArr = JSON.parse(localStorage.getItem("calendar"));
		}
	}

	function makeEvent(date, name){
		eventArr[date] = name;//altered this since it's easier to do key:value pairs this way
		localStorage.setItem("calendar", JSON.stringify(eventArr));
		makeDisplays();
	}

	// function clearPassed(){};

	function displayEvent(index, date, name) {
		$("#calendar").append(
			"<div class='row'><div><h4>" + name + "</h4><h5>" + date + "</h5></div>" + "<div><i id='" + index + "' class='fa fa-trash eventTrash'></i></div></div>"
			);
		
	}

	// Function to make an array to sort, then itterate through to build displays
	function makeDisplays() {
		$("#calendar").html('');
		eventArr.sort();

		for (var i = 0; i < eventArr.length; i++) {
			displayEvent(i, eventArr[i][0], eventArr[i][1]);
		}
	


	$("#dateInput").datetimepicker({format: 'Y/m/d h:i'});

	$("#eventAdd").click(function() {
		var date = $("#dateInput").val();
		var name = $("#nameInput").val();
		makeEvent(date, name);
  	});

	}

	function init() {
		startup();
		makeDisplays();
	}

	return {
		init: init
	};

	}());