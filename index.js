const express = require('express');
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogRouter = require('./routes/blogs')
const methodOverride = require('method-override')
const app = express();
const path = require('path');

const server = 'mongodb+srv://ssd-root:blog1234@blog.g3gqa.mongodb.net/Blog?retryWrites=true&w=majority';       

mongoose.connect(`${server}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB connected!!');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});
console.log(path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use('/blogs', blogRouter)

app.get('/',async (req,res)=>{
    const blogs = await Blog.find().sort({ createdAt: 'desc' })
    res.render('blogs/index', { blogs: blogs})
})

app.listen(8000);



