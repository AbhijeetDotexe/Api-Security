const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser'); 
const connectDatabase = require('./db/db');
const tokenRoutes = require('./routes/tokenRouter');
const path = require('path');
const axios = require('axios');
const token = require('./middleware/token');
const cors = require('cors');


connectDatabase();
// app.use(cors());

app.use(
    cors({
      origin: "*",
      credentials: true, 
    })
);

app.use(express.json());
app.use(session({
    secret: "This is just for testing",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/index',token ,async (req, res) => {
    res.render('index');
  });

app.get('/',(req,res)=>{
    res.send("Hello World, This is for testing the server!");
})

app.get('/testing', async (req, res) => {
  try {
      const token = req.cookies.token;

      const response = await axios.get('http://localhost:4000/api/test1', {
          headers: {
              'x-auth-token': token
          }
      });

      console.log('Response data:', response.data);

      res.status(200).json(response.data);
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'An error occurred while fetching the data' });
  }
});


app.use('/api', tokenRoutes);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
