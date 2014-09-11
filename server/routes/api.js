// var document = require('../controller/document');
var jwt = require('jsonwebtoken');
module.exports = function(app, secret) {
    //图片接口
    app.get('/api/api1', function(req, res) {
        res.send({
            hello: 'hello'
        })
    });

    app.post('/authenticate', function(req, res) {
        //TODO validate req.body.username and req.body.password
        //if is invalid, return 401
        //查数据库 核对用户
        if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
            res.send(401, 'Wrong user or password');
            return;
        }
        console.log(req.body)

        var profile = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@doe.com',
            id: 123
        };

        // We are sending the profile inside the token
        var token = jwt.sign(profile, secret, {
            expiresInMinutes: 60 * 5
        });

        res.json({
            token: token
        });
    });
    app.get('/restricted', function(req, res) {
        console.log('user ' + req.user.email + ' is calling /api/restricted');
        res.json({
            name: 'foo'
        });
    });

};
