const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Return a static webpage');
});

router.post('/onboarding', (req, res) => {
    res.send('Post request to onboard a new restaurant');
});


module.exports = router;