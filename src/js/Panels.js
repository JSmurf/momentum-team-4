var Panels = (function () {

	'use strict';

  	var DOM = {};

  	function cacheDom() {
	  	DOM.$userPref = $('.userpref');
	  	DOM.$userPrefPanel = $('.userprefpanel');
	  	DOM.$toDo = $('.todobutton');
	  	DOM.$toDoPanel = $('.todopanel');
	  	DOM.$calendar = $('.calendar');
	  	DOM.$calendarPanel = $('.calendarpanel');
	  	DOM.$about = $('.about');
	  	DOM.$aboutPanel = $('.aboutpanel');
	}

	function clickPanel() {
	
		DOM.$userPref.click(function() {   
		    DOM.$userPrefPanel.toggle();    
		});

		DOM.$toDo.click(function() {   
		    DOM.$toDoPanel.toggle();     
		});

		DOM.$calendar.click(function() {
			DOM.$calendarPanel.toggle();
		});

		DOM.$about.click(function() {
			DOM.$aboutPanel.toggle();
		});

	}

	function init() {
		cacheDom();
		clickPanel();
	}

	return {
		init: init
	};

}());
