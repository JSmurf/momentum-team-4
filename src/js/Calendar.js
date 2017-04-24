var Calendar = (function() {

	'use strict';

	var today = new Date().getTime();

	function makeEvent(date, name){
		var key = date + name.substr(0, 4);
		localStorage.key = JSON.stringify({"date" : date, "name" : name});
		makeDisplays();
	};

	function getEvents() {

	};

	// function clearPassed(){};

	function displayEvent(key, date, name) {
		$("#calendar").append("<div class='row'><div><h4>" + name + "</h4><h5>" + date + "</h5></div>" + "<div><i id='" + key + "' class='fa fa-trash'></i></div></div>");
		
	};


	//Function to make an array to sort, then itterate through to 
	function makeDisplays() {
		$("#calendar").html('');
		var eventArr = [];
		for (var event in localStorage) {
			if (localStorage.hasOwnProperty(event)) {	
				var tempObj = JSON.parse(localStorage.getItem(event));			
				eventArr.push([event, tempObj.date, tempObj.name]);
				console.log(tempObj);
		};
	};
		eventArr.sort();

		for (var i = 0; i < eventArr.length; i++) {
			displayEvent(eventArr[i][0], eventArr[i][1], eventArr[i][2]);
		};
	};


	$("#dateInput").datetimepicker({format: 'Y/m/d h:i'});

	$("#eventAdd").click(function() {
		var date = $("#dateInput").val();
		var name = $("#nameInput").val();
		makeEvent(date, name);
  	});

	function init() {
		makeDisplays();
		console.log(localStorage);
	}

	return {
		init: init
	}

	}());