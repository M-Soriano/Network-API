const router = require('express').Router();
const apiRoutes = require('./api');
// adds prefix of /api to api routes imported  
router.use('api', apiRoutes);

router.unsubscribe((req, res)=> {
    res.status(404).send('<h1> 404 Error!</h1>');
});

module.exports = router;
