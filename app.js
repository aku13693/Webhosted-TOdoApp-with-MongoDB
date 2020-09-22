
const express = require("express");
const app = express();
const date = require(__dirname+"/date.js");
console.log(date.getDate());
const _ = require("lodash")

const favicon = require("serve-favicon");
const path = require('path')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

const mongoose = require('mongoose');

const bodyParser = require("body-parser");
var items =["Buy Food"];
// var workItems = [];
mongoose.connect('mongodb+srv://admin-akash:test123@cluster0.dbq7w.mongodb.net/toDoListDB', {useNewUrlParser:true});

const todoschema = new mongoose.Schema({
  names:String
})

const listSchema = new mongoose.Schema({

  name: String,
  items : [todoschema]
})

const dynmodel = mongoose.model("dynlist",listSchema)

const todomodel = mongoose.model("todolist",todoschema)

const item1 = todomodel({
  names:"Akash food"
})
const item2 = todomodel({
  names:"Akash food Akash food"
})
const item3 = todomodel({
  names:"Akash food Akash food Akash food"
})

const defaultItems = [item1, item2, item3];



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){

  todomodel.find({},function(err,ifounditems){
    if(ifounditems.length === 0){
      todomodel.insertMany(defaultItems,function(err){

      if(err){
        console.log(err);
      }
      else{
        console.log("success");
      }
      })
      res.redirect("/");
    }

      else {
      //console.log(ifounditems);

        res.render("list",{listTitle:"Today", newItem:ifounditems})
        console.log(ifounditems);

  }
})

    console.log("Server is in get");
})

app.get("/:customListName",function(req,res){
  const custListName = _.capitalize(req.params.customListName);
  console.log("Custom list Name :" + req.params.customListName);
  dynmodel.findOne({name:custListName}, function(err,xnew){
    if(err){
      console.log("error");
    }
    else{
      if(!xnew){
        console.log("does not exists");
        //create a new lsit
        const list3 = dynmodel  ({
          name: custListName,
          items: defaultItems
        })
        console.log("Items in the list:" + xnew);
        list3.save()
        res.redirect("/"+custListName)
      }
      else{
      //  console.log("exists lists");
        //show existing list
        //console.log(custListName);
        //console.log(req.params.customListName);
        console.log(xnew);
        console.log(defaultItems);
        res.render("list",{listTitle:custListName, newItem:xnew.items})
        //console.log(xnew);
      }
    }
  })


})


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

  //   //res.sendFile(__dirname+"/index.html");
  // }
  // else {
  //   day = "weekenrrrrrrrrrrd";
  //   res.render("list",{kindOfDay:day})
    //res.send("Boo i have got to work man");

app.post("/",function(req,res){
//console.log(req.body);
//console.log("server is in post");
const item=req.body.name1;
const listname = req.body.button;
console.log("Data: "+ item);
console.log("List :" + listname);
const temp = todomodel({
  names:item
})
console.log("Temp document : "+temp);
if(listname === "Today"){

  temp.save()
  //console.log(listname);
  res.redirect("/")
}
else{
  dynmodel.findOne({name:listname},function(err,x){

     x.items.push(temp)
     x.save()
     console.log(x);
    res.redirect("/"+listname)
    // console.log("list name");
    // console.log(x.items);
    // // console.log("Akash");
  })
}
})

app.get("/work",function(req,res){

console.log("i am in get of work");
    res.render("list",{listTitle:"Work List",newItem:workItems});
})

app.post("/work",function(req,res){

  var item = req.body.name1;
  workItems.push(item);
  console.log("i am in post of work");
  res.redirect("/work");
})

app.get("/about",function(req,res){

  res.render("about");
})

app.post("/delete",function(req,res){

itemID = req.body.delcheckbox;
listname = req.body.listnamehid;
  console.log(itemID);
  console.log(listname);
  if(listname === "Today"){

    todomodel.findByIdAndRemove(req.body.delcheckbox,function(err){

      if(err){
        console.log(err);
      }
      else{
        console.log("We successfully deleted everything");
      }
    })
    res.redirect("/");
  }else{

    dynmodel.findOneAndUpdate({name: listname},{$pull:{items:{_id:itemID}}},function(err){

      if(err){
        console.log(err);
      }
      else{
        console.log("success");
        res.redirect("/"+listname)
      }
    })
  }

})


app.get("/favicon.ico",function(req,res){
  res.status(204)
})

app.listen(3000,function(req,res){

  console.log("Server listening on PORT 3000");
})
