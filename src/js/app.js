//app.js
$(document).ready(function () {

  Panels.init();
  userPref.init();
  Quotes.init();
  Weather.init();
  TaskMod.init();
  //initialize all modules here
  //Weather Module
  var lon;
  var lat; 
  var temp;
  
 $.getJSON("http://ip-api.com/json", function(data2){
           lat = data2.lat;
           lon = data2.lon;
    $("#data").html("Lattitude = " + lat + "<br> Longitude = " + lon);
   
  var weatherApi = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=f42f0a6dd3ff2b1b9e8d3e1e434b8ad1";
  
  $.getJSON(weatherApi, function(data){
    var city = data.name;
    var temp = (data.main.temp);
    var tempF = Math.round(temp * 9/5 - 459.67);
    var tempC = Math.round(temp - 273.15);
    var listF = tempF + " &#176;";
    var listC = tempC + " &#176;";
    var country = data.sys.country;
    var code = data.weather[0].id;
    
    $("#weatherLocation").html(city + ", " + country);
    $("#weatherTemperature").html(listF);
    $("#weatherIcon").addClass("wi wi-owm-" + code);
    $("#temporary").html(code);
    
    });
  });


});