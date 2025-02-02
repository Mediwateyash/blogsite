const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Yash diwate",
        post: "This is my first post",
    },
    {
        id: uuidv4(),
        username: "Anush Gajbhiye",
        post: "This is my second post",
    },
    {
        id: uuidv4(),
        username: "Vaibhav nikumbh",
        post: "This is my third post",
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post('/upload', (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, post: content });
    res.redirect("/posts");
});

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs", { post });
});

app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newPost = req.body.post;
    let post = posts.find((p) => p.id === id);
    if (post) {
        post.post = newPost;
        console.log("Updated Post:", post);
        res.redirect(`/posts/${id}`);  // Redirect to the updated post page
    } else {
        res.status(404).send("Post not found");
    }
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
