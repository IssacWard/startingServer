const customEmbed = require('../models/customEmbed.model');

module.exports = {
    index: (req,res) => {
        customEmbed.find()
            .then(data => res.json({results: data}))
            .catch(err => console.log(err.errors))
    },
    create : (req,res) => {
        customEmbed.create(req.body)
            .then(data =>  res.json({results:data}))
            .catch(err => res.status(400).json(err))
    },
    specific : (req,res) => {
        customEmbed.findOne({_id: req.params.id})
            .then(data =>  res.json({results:data}))
            .catch(err => console.log(err.errors))
    },
    specificName : (req,res) => {
        customEmbed.findOne({command: req.params.command})
            .then(data =>  res.json({results:data}))
            .catch(err => console.log(err.errors))
    },
    update : (req,res) => {
        customEmbed.findOneAndUpdate({_id:req.params.id},req.body, {runValidators:true, new:true})
            .then(data => res.json({results:data}))
            .catch(err => res.status(400).json(err))
    },
    delete : (req,res) => {
        customEmbed.deleteOne({_id:req.params.id})
            .then(data =>  res.json({results:data}))
            .catch(err => console.log(err.errors))
    }
};