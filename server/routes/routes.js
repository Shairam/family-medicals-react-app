const express = require('express');
const { trusted } = require('mongoose');

const router = express.Router()
const Medicine = require('../models/Medicines');

router.post('/post',  async (req, res)=>{
    console.log(req.body)
    const data = new Medicine({
        name: req.body.name,
        quantity: req. body.quantity,
        unit_price: req.body.unit_price
    })
    try {
        const savedData = await data.save()
        res.status(201).json(savedData)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/getAll', async (req, res)=> {
    try{
        const data = await Medicine.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/getOne/:id', async(req, res)=>{
    try{
        const data = await Medicine.findById(req.params.id);
        if (data != null) {
            res.json(data)
        }
        res.status(404).json({message: 'Entity not found'})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})

router.put('/update/:id', async(req, res) =>{
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Medicine.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/delete/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await Medicine.findByIdAndDelete(id)
        res.send(`Medicine with ${data.name} has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;