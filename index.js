const express = require('express');
const app = express();
const port = 3000
const path = require('path');

app.use(express.urlencoded({extended:true}))

app.set ("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set (express.static(path.join(__dirname, "public")));

app.get ('/',(req,res) =>{
    res.send ('Hello World!')
}
)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});