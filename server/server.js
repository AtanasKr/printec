require('dotenv').config();
const express = require("express");
const app = express();
const customLogger = require('./middleware/logEvents');
const PORT = process.env.PORT || 8080;
const connectDB = require('./config/dbConn');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

connectDB();

// custom middleware logger
app.use(customLogger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware for json 
app.use(express.json());

app.use('/', require('./routes/zipcodes.js'));

//catch all case
app.all('*', (req, res) => {
    res.status(404);
    res.json({ "error": "404 Not Found" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))