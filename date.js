
module.exports.getDate = getDate;
function getDate(){
var today = new Date();
var day ="";
var currentDay = today.getDay();
var options={
  weekday:"long",
  day:"numeric",
  month:"long"
}
day = today.toLocaleDateString("hi-IN",options);
return day;
}

module.exports.getDay = getDay;
function getDay(){
var today = new Date();
var day ="";
var currentDay = today.getDay();
var options={

  weekday:"long",
}
day = today.toLocaleDateString("hi-IN",options);
return day;
}
