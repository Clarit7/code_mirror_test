var express = require('express');
var router = express.Router();

let {PythonShell} = require('python-shell')
var options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: '',
    args: []
};

router.post('/', function(req, res) {
    const code = req.body.code;
    console.log('code execution request');

    PythonShell.runString(code, options, function (err, results) {
        if (err) throw err;
        console.log('finished');
        console.log(results);

        res.send({result: results});
    });
});

module.exports = router;