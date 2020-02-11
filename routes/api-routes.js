
const mongoose = require('mongoose');
var kittySchema = new mongoose.Schema({
    name: String
});
var Kitten = mongoose.model('Kitten', kittySchema);
var fluffy = new Kitten({ name: 'anand' });


// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

router.get("/save", async (request, response) => {
        try {
            await fluffy.save();
            
        } catch (error) {
            response.status(500).send(error);
        }
});
router.get("/people", async (request, response) => {
    try {
        var result = await Kitten.find().exec();
        console.log(result);
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
// Export API routes
module.exports = router;