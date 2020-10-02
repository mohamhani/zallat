const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/emission/:state/:year', async (req, res) => {

    if(!req.params.state || !req.params.year) {
        return res.status(400).json({msg: 'Please enter a state and a year'});
    }

    const stateEmission = await api.stateEmission(req.params.state, req.params.year);
    console.log(stateEmission);

    res.json({"State emission": stateEmission});
});

router.get('/tax/:state/:from/:to', async (req, res) => {

    if(!req.params.state || !req.params.from || !req.params.to) {
        return res.status(400).json({msg: 'Please enter a state and from and to'});
    }

    const stateTotalTax = await api.stateTotalTax(req.params.from, req.params.to, req.params.state);
    console.log(stateTotalTax);

    res.json({"State tax": stateTotalTax});
});





module.exports = router;