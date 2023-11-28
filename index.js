import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Get the starting page
app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts});
});

// Add the item to the list
app.post("/create", (req, res) => {
  const postItem = req.body.newTodo.trim();

  if (postItem !== "") {
    posts.push(postItem);
    res.redirect('/');
  } else {
    res.status(400).send('Invalid post item.');
  }
});

// Edit item from the list
app.post("/edit", (req, res) => {
  const postIndex = req.body.itemId;
  const editedTodo = req.body.editedData;

  if (!isNaN(postIndex) && postIndex >= 0 && postIndex < posts.length) {
    posts[postIndex] = editedTodo;
    console.log('Array Updated:', posts);
    res.redirect('/');
  } else {
    res.status(400).send('Invalid post index.');
  }
});


// Remove item from the list
app.post("/remove", (req, res) =>{
  const postIndex = req.body.postIndex;

  if (!isNaN(postIndex) && postIndex >= 0 && postIndex < posts.length) {
    posts.splice(postIndex, 1);
    res.redirect('/');
  } else {
    res.status(400).send('Invalid post index.');
  }
})

// Start to listen
app.listen(port, () =>{
    console.log(`Server is running on port ${port}.`);
})
