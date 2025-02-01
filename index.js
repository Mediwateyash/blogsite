const express = require('express');
const app = express();
const port = 3000
const path = require('path');

app.use(express.urlencoded({extended:true}))

app.set ("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set (express.static(path.join(__dirname, "public")));

let posts = [
    {
        username : "Yash diwate",
        post : "This is my first post",
    },
    {
        username : "Anush Gajbhiye",
        post : "This is my second post",
    },
    {
        username : "Vaibhav nikumbh",
        post : "This is my third post",
        },

]

app.get ("/posts",(req,res) =>{
    res.send("Server is working");
}
)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});