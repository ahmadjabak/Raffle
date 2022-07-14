const express = require("express");
const router = express.Router();

const contact = require("../schema/Contactus");

router.post('/', async (req, res) => {
    const newMsg = new contact({
        fname: req.query.fname,
        lname: req.query.lname,
        phonenumber: req.query.phonenumber,
        email: req.query.email,
        time: req.query.time,
        message: req.query.message
    });
    console.log(req.query);
    try {
        await newMsg.save();
    } catch (e) {
        console.log(e.message)
    }

});

router.get('/', (req, res) => {
    contact.find()
        .then(contact => res.json(contact))
        .catch(err => res.status(400)
            .json("error: " + err))
})

router.delete('/', (req, res) => {
    contact.findByIdAndDelete(req.query.id)
        .then(() => res.json('Deleted Successfuly'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.get('/number', (req, res) => {

    contact.count({})
        .then(raffles => res.json(raffles))
        .catch(err => res.status(400)
            .json("error: " + err))
})

module.exports = router;