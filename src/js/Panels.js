var Panels = (function () {

	//'use strict';

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
		    $('#middle').css("z-index", -1);
		    DOM.$userPrefPanel.css("z-index", 1);

		});

		if ( $('.userprefpanel').css('display') == 'none' ){
    // element is hidden
    console.log("hidden");
    $('#middle').css("z-index", 1);
		DOM.$userPrefPanel.css("z-index", -1);
		}

		DOM.$toDo.click(function() {   
		    DOM.$toDoPanel.toggle();
		    $("#middle").css("z-index", -1);
		    DOM.$toDoPanel.css("z-index", 1); 
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
