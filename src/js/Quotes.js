var Quotes = (function () {

	//'use strict';

	var DOM = {};

	function cacheDom() {
  	DOM.$quote = $('.quote');
  	DOM.$userPrefFeatures = $('#userpref-features');
  	DOM.$userPrefTheme = $('#userpref-theme');
  	DOM.$userPrefQuotes = $('#userpref-quotes');
	}

	function getQuote() {
		//default

		compscience();

		$('#inspiring').click(function(){
			DOM.$userPrefQuotes.show();
			DOM.$userPrefTheme.hide();
			DOM.$userPrefFeatures.hide();
			if ($('#inspiring').prop('checked')) {
				localStorage.setItem("quotes", "inspiring");
				inspirational();
			}
		});

		$('#compscience').click(function(){
			DOM.$userPrefQuotes.show();
			DOM.$userPrefTheme.hide();
			DOM.$userPrefFeatures.hide();
			if ($('#compscience').prop('checked')) {
				localStorage.setItem("quotes", "compsci");
				compscience();
			}
		});

		function inspirational() {
			var quotes = [
				["Setting an example is not the main means of influencing another, it is the only means.", "Albert Einstein"], ["The legacy of heroes is the memory of a great name and the inheritance of a great example.", "Benjamin Disraeli"], ["Nothing is so contagious as example; and we never do any great good or evil which does not produce its like.", "Francois de la Rochefoucauld"], ["Society is always taken by surprise at any new example of common sense.", "Ralph Waldo Emerson"], ["Few things are harder to put up with than a good example.", "Mark Twain"], ["Example is the best precept.", "Aesop "], ["I have ever deemed it more honorable and more profitable, too, to set a good example than to follow a bad one.", "Thomas Jefferson"], ["Example has more followers than reason.", "Christian Nevell Bovee"], ["Sports serve society by providing vivid examples of excellence.", "George F. Will"], ["You must inspire people to give it all they have by using yourself as an example.", "Byron and Catherine Pulsifer, more Common Traits of a Coach"], ["There are numerous examples of people throughout the world who have overcome handicaps to achieve great success.", "Dare 2 B U"]
			];

			var random = Math.floor(Math.random()*quotes.length);
			var item = quotes[random][0];
			var author = quotes[random][1];

			DOM.$quote.html("<h3 class='quote-content'>" + item + "</h3>" + "<p class='quote-author'>" + author + "</p>");
		}

		function compscience() {
  		$.getJSON("https://cors-anywhere.herokuapp.com/http://quotes.stormconsultancy.co.uk/random.json?callback=", function(json){
      	if (json.length < 181) {
	        DOM.$quote.html("<h3 class='quote-content'>" + json.quote + "</h3>" + "<p class='quote-author'>" + json.author + "</p>");
      	} else { inspirational(); }
  		});
	  }

		  function localstorage() {
			var quotechoice = localStorage.getItem("quotes");

				if (quotechoice === "inspiring") {
					inspirational();
				} else if (quotechoice === "compsci") {
					compscience();
				}

		}

	}


	function init() {
		cacheDom();
		getQuote();
		//localstorage();
	}

	return {
		init: init
	};

}());