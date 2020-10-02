const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/emission/:from/:to', async (req, res) => {

    if(!req.params.from || !req.params.to) {
       return res.status(400).json({msg: 'Please enter a state and a year'});
    }

    let from = req.params.from.toString();
    let to = req.params.to.toString();

    const response = await api.stateWithhighestEmission(from, to);

    res.json(response);
});

module.exports = router;