const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3400;
const DB_URL = process.env.DB_URL;

const app = express();
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})

mongoose.connect(DB_URL).then(()=>{
    console.log("connected to the database")
})

app.use(cors());
app.use(express.json());
app.use("/images", express.static("images")); // Serve images statically
app.use("/events", require('./routes/eventRoute'));
app.use("/posters",require('./routes/posterRoute'));
app.use("/recruitments",require('./routes/recRoute'));
app.use("/hero",require('./routes/heroRoute'));






