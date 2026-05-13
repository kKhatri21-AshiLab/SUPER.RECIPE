// Basic Express server setup
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
 
app.listen(3000, () => {
    
})

app.use(express.json()); // Middleware to parse JSON

app.get('/', (req, res) => {
  
  res.sendFile('indexMain.html', { root: __dirname });
   
});

// app.get('/', (req, res) => {

//   res.send(console.log('Hello, World! This is a basic CRITICAL THINKING HOW TO EFFECTIVELY REASON, UNDERSTAND IRRATIONALITY, AND MAKE BETTER DECISIONS. '));

// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
