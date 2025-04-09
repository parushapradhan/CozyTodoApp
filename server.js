const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// const bodyParser = require('body-parser');
// const messageRoutes = require('./routes/messageRoutes');

const app = express();
// const PORT = 3000;

// Replace with your MongoDB URI
mongoose.connect(`mongodb+srv://parushapradhan78:${process.env.DB_password}@cluster0webdev.ot1x2pr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0webdev`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

// app.set('view engine', 'ejs');
app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/', messageRoutes);


// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  
// app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));


// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});


app.get('/test', function(req, res) {
  res.render('pages/test');
});

app.get('/idk', function(req, res) {
  res.render('pages/idk');
});


app.listen(8080);
console.log('Server is listening on port 8080');