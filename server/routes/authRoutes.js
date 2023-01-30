const express = require('express');
const { trusted } = require('mongoose');
const Bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../../.env' });

router.post('/post',  async (req, res)=>{
    try {
        const savedData = await User.findOne({'username': req.body.username}, 'username password name');
        TOKEN_KEY="6f9f4a6762c19cd8d79b4812985154ba47f6df058dcfe4833ee00266650feb23fd1d1bccaea4fb779aa9bc5029d8ea47"
        if (savedData){
            if (await Bcrypt.compare(req.body.password, savedData.password))
            {   
                console.log(process.env.TOKEN_KEYz);
                const token = jwt.sign(
                    { user_id: savedData._id, username: savedData.username },
                    TOKEN_KEY,
                    {
                      expiresIn: "20s",
                    }
                  );
            
                  // save user token
                  savedData.token = token;
                return res.status(200).json(savedData);

            }  else {
                res.status(401).json({message: 'Unauthorized Username and Password'})
            }
        } else {
            res.status(401).json({message: 'Unauthorized Username and Password'})
        }
       
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/register',  async (req, res)=>{
    try {
        const founduser = await User.findOne({'username': req.body.username}, 'username name');
        if (founduser){
           return res.status(409).send();
        } 
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password:  await Bcrypt.hash(req.body.password, 15)
        })

        const addedUSer = await user.save();
        res.status(201).json(addedUSer);
       
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router;