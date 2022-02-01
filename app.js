const express = require("express");

// set up a new app using the express module
const app = express();

app.set('view engine', 'ejs');

// this line of code allows us to parse the request body
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const items = [];   // array of all items on shopping list
const bulkItems = [];  // array of bulk items

// create a root route for the get method
app.get('/', function(req, res) {
    res.render("list", {listName: "Shopping List", listItems: items});  // send the items array to the list.ejs page
});

// bulk items route
app.get("/bulk", function(req, res) {
    res.render("list", {listName: "Bulk Items", listItems: bulkItems});
});

// retrieve data and display it on the screen and to the console
app.post("/", function(req, res) {
    const query = req.query.newItem;  // retrieve item from querystring
    console.log(query);
    const item = req.body.newItem;    // retrieve item from form named newItem
    const list = req.body.list;    // retrieve name of the list
    
    if( typeof(query) != "undefined" )   // check if the querystring is not blank
    {
        items.push(query);   // add new item to the list
        res.redirect("/");
    }
    
    if( typeof(item) != "undefined" )    // check if the item from the form is not blank
    {
        if( list === "Shopping List" )    // check the name of the list
        {
            items.push(item);   // add new item to the list
            res.redirect("/");
        }
        else      // assume if list is not Shopping List, it is Bulk items. If more routes
        {         //  are added, this will need to be an else if statement
            bulkItems.push(item);
            res.redirect("/bulk");
        }
    }
    
});

app.post("/delete", function(req, res) {
    const checkedItemId = req.body.checkbox;  // retrieve the checked item
    const list = req.body.thislist;   // retrieve the name of the list

    if( list === "Shopping List" )
    {
        items.splice(checkedItemId, 1);  // delete the checked item from the array
        res.redirect("/");  // redirect back to the home page and render the list
    }
    else
    {
        bulkItems.splice(checkedItemId, 1);
        res.redirect("/bulk");
    } 
    
});

// run on port 3000.  To access, go to localhost:3000
app.listen(3000, function() {
    console.log("Server started on port 3000.");
});