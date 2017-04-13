var Quotes = (function () {

	'use strict';

  	var DOM = {};

  	function cacheDom() {
	  	DOM.$quote = $('.quote');
	}

	function getQuote() {
		$.ajax( {
	      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
	      success: function(data) {
	        var response = data.shift();
	        DOM.$quote.html("<h3 class='quote-content'>" + response.content + "</h3>" + "<p class='quote-author'>" + response.title + "</p>");
	      },
	      cache: false
  		});
	}


	function init() {
		cacheDom();
		getQuote();
	}

	return {
		init: init
	};

}());