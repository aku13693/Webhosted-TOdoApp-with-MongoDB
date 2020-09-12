
const express = require("express");
const app = express();
const date = require(__dirname+"/date.js");
console.log(date.getDate());
const bodyParser = require("body-parser");
var items =["Buy Food"];
var workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){

    // var today = new Date();
    // var day ="";
    // var currentDay = today.getDay();

    // switch (currentDay) {
    //   case 0:
    //       day = "Sunday";
    //     break;
    //     case 1:
    //         day = "Monday";
    //       break;
    //       case 2:
    //           day = "Tuesday";
    //         break;
    //         case 3:
    //             day = "Wednesday";
    //           break;
    //           case 4:
    //               day = "Thursday";
    //             break;
    //             case 5:
    //                 day = "Friday";
    //               break;
    //               case 6:
    //                   day = "Saturday";
    //                 break;
    //   default:
    //       console.log("Error current day is "+currentDay);
    // }

    // var options={
    //
    //   weekday:"long",
    //   day:"numeric",
    //   month:"long"
    // }
    // day = today.toLocaleDateString("hi-IN",options);

  // if(currentDay === 6 || currentDay === 0)
  //   {
  //     day = "Weekdakashay";
  res.render("list",{listTitle:date.getDate(), newItem:items})
  //   //res.sendFile(__dirname+"/index.html");
  // }
  // else {
  //   day = "weekenrrrrrrrrrrd";
  //   res.render("list",{kindOfDay:day})
    //res.send("Boo i have got to work man");

    console.log("Server is in get");
})

app.post("/",function(req,res){
console.log(req.body);
console.log("server is in post");
item=req.body.name1;
if (req.body.button === "Work"){
workItems.push(item);
res.redirect("/work");
}
else{
items.push(item);
  //res.render("list",{newItem:req.body.name1})
  res.redirect("/");
}
})

app.get("/work",function(req,res){

    res.render("list",{listTitle:"Work List",newItem:workItems});
})

app.post("/work",function(req,res){

  var item = req.body.name1;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about",function(req,res){

  res.render("about");
})

app.listen(3000,function(req,res){

  console.log("Server listening on PORT 3000");
})
