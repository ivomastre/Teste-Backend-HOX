var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({message: "safe de tudo"})
});

module.exports = router;
