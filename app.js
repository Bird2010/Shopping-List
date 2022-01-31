const express = require("express");

// set up a new app using the express module
const app = express();

app.set('view engine', 'ejs');

// this line of code allows us to parse the request body
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// array of all items on shopping list
const items = [];

// create a root route for the get method
app.get('/', function(req, res) {
    res.render("list", {listItems: items});  // send the items array to the list.ejs page
});

// retrieve data and display it on the screen and to the console
app.post("/", function(req, res) {
    const item = req.body.newItem;    // retrieve item from form named newItem
    items.push(item);   // add new item to the list
    res.redirect("/");
});

app.post("/delete", function(req, res) {
    const checkedItemId = req.body.checkbox;  // retrieve the checked item
    items.splice(checkedItemId, 1);  // delete the checked item from the array
    res.redirect("/");  // redirect back to the home page and render the list
});

// run on port 3000.  To access, go to localhost:3000
app.listen(3000, function() {
    console.log("Server started on port 3000.");
});