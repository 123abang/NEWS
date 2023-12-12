// Import necessary packages
import express from 'express'; // Import Express.js framework
import ejs from 'ejs'; // Templating engine for rendering HTML
import fetch from 'node-fetch'; // Fetch for making HTTP requests
import body from 'body-parser'; // Middleware for parsing incoming request bodies
import { fileURLToPath } from 'url'; // Utilities for working with file paths
import { dirname } from 'path'; // Utilities for working with file paths
import dotenv from 'dotenv'; // For managing environment variables
import md5 from 'md5'
dotenv.config(); // Load environment variables

// Import and initialize MongoDB and define user schema
import mongoose from 'mongoose'; // Import MongoDB ORM
mongoose.connect('mongodb://127.0.0.1:27017/NewsDB',{useNewUrlParser:true}) // Connect to MongoDB
.then(() => console.log('Connected to MongoDB')) // On successful connection, log success
.catch((err) => console.error('MongoDB connection error:', err)); // Log any connection errors
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true, // Require an email for user
    },
    password:{
        type:String,
        required:true // Require a password for user
    }
})
const User= new mongoose.model('user',userSchema); // Create User model

// Initialize Express app
const app= express(); // Create an instance of Express


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Middleware setup
app.use(body.urlencoded({extended:true})); // Body parser middleware for URL-encoded data
app.use(express.static('public')); // Serve static files

const apikey= process.env.API_KEY; // Fetch API key from environment variables

// Route to fetch and render news based on categories



app.get('/home', async (req, res) => {
    try {
        const sportResponse = await fetch('https://newsapi.org/v2/everything?q=sports&apiKey='+apikey);
        const financeResponse = await fetch('https://newsapi.org/v2/everything?q=business&apiKey='+apikey);
        const gamingResponse = await fetch('https://newsapi.org/v2/everything?q=gaming&apiKey='+apikey);
    
    
    
        const sportData = await sportResponse.json();
        const financeData = await financeResponse.json();
        const gamingData=await gamingResponse.json()


        res.render('welcome.ejs', {
            sportsArticles: sportData.articles,
            financeArticles: financeData.articles,
            gamingArticles: gamingData.articles
            // Add more categories to be rendered
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching news');
    }
});

app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.get('/SignUp',(req,res)=>{
    res.render('signup.ejs')
})

app.get('/',(req,res)=>{
    res.render('require.ejs')
})




app.post('/', async (req, res) => {
    const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q='+search+'&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('homes.ejs', { news: articles, searchTerm: search });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const response = await fetch(`https://newsapi.org/v2/everything?q=${title}&apiKey=`+apikey);
        const data = await response.json();
        
        const selectedArticle = data.articles.find(article => article.title === title);
        
        if (!selectedArticle) {
            return res.status(404).send('Article not found');
        }

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});




  app.get('/racing', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=racing&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});

app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title;

        const response = await fetch('https://newsapi.org/v2/everything?q=racing&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});


app.get('/tech', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=tech&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title; 

        const response = await fetch('https://newsapi.org/v2/everything?q=tech&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});


app.get('/travel', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=travel&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title;

        const response = await fetch('https://newsapi.org/v2/everything?q=travel&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});

app.get('/sport', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=sport&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title; 

        const response = await fetch('https://newsapi.org/v2/everything?q=sport&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});


app.get('/finance', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=finance&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title; 

        const response = await fetch('https://newsapi.org/v2/everything?q=finance&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});


app.get('/weather', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=weather&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title; 

        const response = await fetch('https://newsapi.org/v2/everything?q=weather&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});



app.get('/music', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=music&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title; 

        const response = await fetch('https://newsapi.org/v2/everything?q=music&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});


app.get('/life', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=life&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title; 

        const response = await fetch('https://newsapi.org/v2/everything?q=life&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});

app.get('/tv', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=tv&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title; 

        const response = await fetch('https://newsapi.org/v2/everything?q=tv&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});


app.get('/culture', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=culture&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


// Your Express route for displaying full news details based on title
app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title; 

        const response = await fetch('https://newsapi.org/v2/everything?q=culture&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});

app.get('/gaming', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=gaming&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title; 

        const response = await fetch('https://newsapi.org/v2/everything?q=gaming&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});

app.get('/live', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=live&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title; 

        const response = await fetch('https://newsapi.org/v2/everything?q=live&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});

app.get('/world', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=world&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title; 

        const response = await fetch('https://newsapi.org/v2/everything?q=world&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});

app.get('/football', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=football&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title;

        const response = await fetch('https://newsapi.org/v2/everything?q=football&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});

app.get('/footer',(req,res)=>{
    res.render('partials/footer.ejs')
})

app.get('/basketball', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=basketball&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title;

        const response = await fetch('https://newsapi.org/v2/everything?q=basketball&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});

app.get('/boxing', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=boxing&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title; 

        const response = await fetch('https://newsapi.org/v2/everything?q=boxing&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});

app.get('/middle-east', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=middle-east&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title; 

        const response = await fetch('https://newsapi.org/v2/everything?q=middle-east&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});

app.get('/earth', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=earth&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title;

        const response = await fetch('https://newsapi.org/v2/everything?q=earth&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});

app.get('/cars', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=cars&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title;

        const response = await fetch('https://newsapi.org/v2/everything?q=cars&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});

app.get('/business', async (req, res) => {
    // const search = req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=business&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('home.ejs', { news: articles, });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});


app.get('/news/:title', async (req, res) => {
    try {
        const title = req.params.title;

        const response = await fetch('https://newsapi.org/v2/everything?q=business&apiKey='+apikey);
        const data = await response.json();
        const selectedArticle = data.articles.find(article => article.title === title);
        // console.log(selectedArticle);

        res.render('detailed.ejs', { article: selectedArticle });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news details');
    }
});
app.get('/about',(req,res)=>{
    res.render('about.ejs')
})


app.get('/breaking', async (req, res) => {
    // const search =req.body.search
    try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey='+apikey);
        const data = await response.json();
        const articles = data.articles || [];
        res.render('breaking.ejs', {news: articles });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching articles');
    }
});



app.get('/breaking/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey='+apikey);
        const data = await response.json();
        const articles = data.articles || [];
        const selectedArticle = articles.find(article => article.title === title)
        // console.log(selectedArticle);
            res.render('breakingDetails.ejs', { article: selectedArticle });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching article details');
    }

})



app.post('/breaking', async (req, res) => {
    const search = req.body.enter
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q='+search+'&apiKey='+apikey);
        const data = await response.json();
        // console.log(data);
        const articles = data.articles || [];
        res.render('breaking.ejs', { news: articles, searchTerm: search });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching news');
    }
});

app.post('/signup',(req,res)=>{
    const login=new User({
      email:req.body.user,
      password:md5(req.body.password)
    })
    login.save()
    .then(()=>{
      res.redirect('/home')
    }).catch((err)=>{
      res.send('error creating user')
    })
  })
  
  app.post('/login',(req,res)=>{
    const username=req.body.user
    const password=md5(req.body.password)
    User.findOne({email:username})
  
    .then((founduser)=>{
     if(founduser.password===password){
       res.redirect('/home')
     }
    }).catch((err)=>{
     console.log(err)
     res.send('user not found register first')
    })
  })
  app.use((req, res, next) => {
    res.status(404).render('error.ejs');
  });

app.listen(4000,()=>{
    console.log('running @ 4000');
})
