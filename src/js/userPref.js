var userPref = (function () {

	'use strict';

  	var DOM = {};

  	function cacheDom() {
  		//all features available
	  	DOM.$userPref = $('.userpref');
	  	DOM.$toDo = $('.todo');
	  	DOM.$quote = $('.quote');
	  	DOM.$greeting = $('.greeting');
	  	DOM.$time = $('.time');
	  	DOM.$weather = $('.weather');
	  	DOM.$about = $('.about');
	  	DOM.$calendar = $('.calendar');
	  	//nav that toggles...
	  	DOM.$features = $('.features');
	  	DOM.$theme = $('.theme');
	  	DOM.$quotes = $('.quotes');
	  	//...right selection sections
	  	DOM.$userPrefFeatures = $('#userpref-features');
	  	DOM.$userPrefTheme = $('#userpref-theme');
	  	DOM.$userPrefQuotes = $('#userpref-quotes');
	  	//features to show
	  	DOM.$toDoFeat = ('#todofeat');
	}

	/* Toggle Nav */

	function userPrefNav() {

		DOM.$features.click(function() {
			DOM.$userPrefFeatures.toggle();
		});

		DOM.$theme.click(function() {
			DOM.$userPrefTheme.toggle();
		});

		DOM.$quotes.click(function() {
			DOM.$userPrefQuotes.toggle();
		});

	}

	/* Features */
	function featuresCheck() {

		$('#todofeat').click(function(){
			if ($('#todofeat').prop('checked')) {
				$('.todo').show();
			} else {
				$('.todo').hide();
			}
		});
		$('#weatherfeat').click(function(){
			if ($('#weatherfeat').prop('checked')) {
				$('.weather').show();
			} else {
				$('.weather').hide();
			}
		});
		$('#calendarfeat').click(function(){
			if ($('#calendarfeat').prop('checked')) {
				$('.calendar').show();
			} else {
				$('.calendar').hide();
			}
		});
		$('#quotefeat').click(function(){
			if ($('#quotefeat').prop('checked')) {
				$('.quote').show();
			} else {
				$('.quote').hide();
			}
		});
		$('#greetingfeat').click(function(){
			if ($('#greetingfeat').prop('checked')) {
				$('.greeting').show();
			} else {
				$('.greeting').hide();
			}
		});
		$('#timefeat').click(function(){
			if ($('#timefeat').prop('checked')) {
				$('.time').show();
			} else {
				$('.time').hide();
			}
		});
		$('#aboutfeat').click(function(){
			if ($('#aboutfeat').prop('checked')) {
				$('.about').show();
			} else {
				$('.about').hide();
			}
		});


		
		
		//if (DOM.$toDoFeat.checked === true) { console.log('checked'); DOM.$toDo.show(); }
		//if (DOM.$toDoFeat.checked === false) { console.log('notchecked'); DOM.$toDo.hide(); }

	}


	function selectTheme() {

		$('#themedark').click(function(){
			if ($('#themedark').prop('checked')) {
				$('body').css({
					"color": "#fff",
					"background-image": "url('')",
					"background-color": "black"
				});
				//how to make sure only one radio checked?????????
				$('#themelight').prop('checked') = false;
				$('#themecolor').prop('checked') = false;
			}
		});

		$('#themelight').click(function(){
			if ($('#themelight').prop('checked')) {
				$('body').css({
					"color": "#000",
					"background-image": "url('')",
					"background-color": "#fff"
				});
				$('#themedark').prop('checked') = false;
				$('#themecolor').prop('checked') = false;
			}
		});

		$('#themecolor').click(function(){
			if ($('#themecolor').prop('checked')) {
				$('body').css({
					"color": "#fff",
					"background-image": "url('')",
					"background-color": "red"
				});
				$('#themelight').prop('checked') = false;
				$('#themedark').prop('checked') = false;
			}
		});

	}

	function init() {
		cacheDom();
		userPrefNav();
		featuresCheck();
		selectTheme();
	}

	return {
		init: init
	};

}());