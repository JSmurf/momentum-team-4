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
	}

	function localstorage() {

		var theme = localStorage.getItem("theme");
		var features = localStorage.getItem("features");
		if((theme != null)&&(features != null)){

		if (features.indexOf("todo") === -1) {
			DOM.$toDo.hide();
		}
		if (features.indexOf("weather") === -1) {
			DOM.$weather.hide();
		}
		if (features.indexOf("calendar") === -1) {
			DOM.$calendar.hide();
		}
		if (features.indexOf("quote") === -1) {
			DOM.$quote.hide();
		}
		if (features.indexOf("greeting") === -1) {
			DOM.$greeting.hide();
		}
		if (features.indexOf("time") === -1) {
			DOM.$time.hide();
		}
		if (features.indexOf("about") === -1) {
			DOM.$about.hide();
		}

		if (theme === "dark") {
			$('body').css({
					"color": "#fff",
					"background-image": "url('https://static.pexels.com/photos/26171/pexels-photo.jpg')",
					"background-color": "#2b002c"
				});
		} else if (theme === "light") {
			$('body').css({
					"color": "#000",
					"background-image": "url('https://static.pexels.com/photos/20974/pexels-photo.jpg')",
					"background-color": "#bcf6ff",
					"text-shadow": "none"
				});
				$('#unit').css({
					"color": "#000"
				});
				$('.quote-content').css({
					"color": "#000"
				});
				$('.quote-author').css({
					"color": "#000"
				});
		} else if (theme === "colorful") {
				$('body').css({
					"color": "#fff",
					"background-image": "url('http://www.publicdomainpictures.net/pictures/120000/velka/rainbow-colors-background.jpg')",
					"background-color": "#ff863d"
				});
		} else if (theme === "stars") {
				$('body').css({
					"color": "#fff",
					"background-image": "url('https://static.pexels.com/photos/353423/pexels-photo-353423.jpeg')",
					"background-color": "#005460"
				});
		}
	}
		
	}

	/* Toggle Nav */

	function userPrefNav() {

		DOM.$userPrefFeatures.show();
		DOM.$userPrefTheme.hide();
		DOM.$userPrefQuotes.hide();

		DOM.$features.click(function() {
			DOM.$userPrefFeatures.show();
			DOM.$userPrefTheme.hide();
			DOM.$userPrefQuotes.hide();
		});

		DOM.$theme.click(function() {
			DOM.$userPrefTheme.show();
			DOM.$userPrefQuotes.hide();
			DOM.$userPrefFeatures.hide();
		});

		DOM.$quotes.click(function() {
			DOM.$userPrefQuotes.show();
			DOM.$userPrefFeatures.hide();
			DOM.$userPrefTheme.hide();
		});

	}

	var featuresarr = ["todo", "weather", "calendar", "quote", "greeting", "time", "about"];

	/* Feature Inputs */

		$('#todofeat').click(function(){
			if ($('#todofeat').prop('checked')) {
				DOM.$toDo.show();
				featuresarr.push("todo");
			} else {
				DOM.$toDo.hide();
				featuresarr.splice(featuresarr.indexOf("todo"), 1);
			}
			localStorage.setItem("features", featuresarr.toString());
		});
		$('#weatherfeat').click(function(){
			if ($('#weatherfeat').prop('checked')) {
				$('.weather').show();
				featuresarr.push("weather");
			} else {
				$('.weather').hide();
				featuresarr.splice(featuresarr.indexOf("weather"), 1);
			}
			localStorage.setItem("features", featuresarr.toString());
		});
		$('#calendarfeat').click(function(){
			if ($('#calendarfeat').prop('checked')) {
				$('.calendar').show();
				featuresarr.push("calendar");
			} else {
				$('.calendar').hide();
				featuresarr.splice(featuresarr.indexOf("calendar"), 1);
			}
			localStorage.setItem("features", featuresarr.toString());
		});
		$('#quotefeat').click(function(){
			if ($('#quotefeat').prop('checked')) {
				$('.quote').show();
				featuresarr.push("quote");
			} else {
				$('.quote').hide();
				featuresarr.splice(featuresarr.indexOf("quote"), 1);
			}
			localStorage.setItem("features", featuresarr.toString());
		});
		$('#greetingfeat').click(function(){
			if ($('#greetingfeat').prop('checked')) {
				$('.greeting').show();
				featuresarr.push("greeting");
			} else {
				$('.greeting').hide();
				featuresarr.splice(featuresarr.indexOf("greeting"), 1);
			}
			localStorage.setItem("features", featuresarr.toString());
		});
		$('#timefeat').click(function(){
			if ($('#timefeat').prop('checked')) {
				$('.time').show();
				featuresarr.push("time");
			} else {
				$('.time').hide();
				featuresarr.splice(featuresarr.indexOf("time"), 1);
			}
			localStorage.setItem("features", featuresarr.toString());
		});
		$('#aboutfeat').click(function(){
			if ($('#aboutfeat').prop('checked')) {
				$('.about').show();
				featuresarr.push("about");
			} else {
				$('.about').hide();
				featuresarr.splice(featuresarr.indexOf("about"), 1);
			}
			localStorage.setItem("features", featuresarr.toString());
		});

	/* Theme Inputs */

		$('#themedark').click(function(){
			DOM.$userPrefTheme.show();
			DOM.$userPrefQuotes.hide();
			DOM.$userPrefFeatures.hide();
			if ($('#themedark').prop('checked')) {
				localStorage.setItem("theme", "dark");
				localstorage();
			}
		});

		$('#themelight').click(function(){
			DOM.$userPrefTheme.show();
			DOM.$userPrefQuotes.hide();
			DOM.$userPrefFeatures.hide();
			if ($('#themelight').prop('checked')) {
				localStorage.setItem("theme", "light");
				localstorage();
			}
		});

		$('#themecolor').click(function(){
			DOM.$userPrefTheme.show();
			DOM.$userPrefQuotes.hide();
			DOM.$userPrefFeatures.hide();
			if ($('#themecolor').prop('checked')) {
				localStorage.setItem("theme","colorful");
				localstorage();
			}
		});

		$('#themestars').click(function(){
			DOM.$userPrefTheme.show();
			DOM.$userPrefQuotes.hide();
			DOM.$userPrefFeatures.hide();
			if ($('#themestars').prop('checked')) {
				localStorage.setItem("theme","stars");
				localstorage();
			}
		});

	function init() {
		cacheDom();
		localstorage();
		userPrefNav();
	}

	return {
		init: init
	};

}());