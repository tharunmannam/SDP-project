const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
mongoose.connect('mongodb+srv://EventManagement:EventManagement@firstcluster.dp3xk.mongodb.net/EventManagementSystem?retryWrites=true&w=majority',{useNewUrlParser: true , useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open', () => console.log("connected to the mongodb"));

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const port = process.env.port || 4500;

const UserRoute=require('./routes/UserRoute');

const bookevent=require('./routes/BookEventRoute');

app.use('/user',UserRoute);
app.use('/event', bookevent);

app.listen(port, () => console.log(`running on the server ${port}`));