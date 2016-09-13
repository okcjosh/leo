var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/leos/:department/:jobtype', function (req, res) {
  var db = req.db;
  var leos = db.query('CALL es4.selectLeos(' + req.params.department + ', ' + req.params.jobtype + ')', function(err, rows){
    if(err) {
      res.send(err);
    }
    res.send(rows[0]);
  });
})

module.exports = router;
