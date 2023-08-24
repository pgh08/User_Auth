const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/User-Auth');

const app = express();

const PORT = 5000;

app.use(cors());

// To let express know we use json as req body.
app.use(express.json());

app.post('/api/register', async (req, res) => {
    try{
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });
        res.json({status: "ok"});
    }
    catch(err){
        res.json({status: "error", error: "Duplicate email"})
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });

    if(!user){
        return res.json({status: 'error', error: "User not found please register"});
    }

    // Validation of hashed password.
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if(isValidPassword){
        // JWT verification.
        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, 'Pass1234')
        
        return res.json({status: "ok", user: token});
    }
    else{
        return res.json({status: "error", error: "Please enter the valid password"});
    }
})

app.get('/api/quote', async(req, res) => {
    const token = req.headers['x-access-token'];

    try{
        const decoded = jwt.verify(token, 'Pass1234');

        const email = decoded.email;

        const user = await User.findOne({email: email});

        return res.json({status: 'ok', quote: user.quote});
    }
    catch(error){
        console.log(error);
        res.json({status: 'error', error: "Invalid token"});
    }
})

app.post('/api/quote', async(req, res) => {
    const token = req.headers['x-access-token'];

    try{
        const decoded = jwt.verify(token, 'Pass1234');

        const email = decoded.email;

        const user = await User.updateOne({email: email}, {$set: {quote: req.body.quote}});

        return res.json({status: 'ok'});
    }
    catch(error){
        console.log(error);
        res.json({status: 'error', error: "Invalid token"});
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})