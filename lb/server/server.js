'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');

var app = module.exports = loopback();


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

app.post('/login', (req,res) =>{
  let User = app.models.User;

  let userInfo = req.body

  User.login({email: userInfo.email, password: userInfo.password}, function (err, token) {
    if (err){
      res.send ('there was error ')
    }else {
      res.send(token)
    }
  })
})

// app.get('/getprojects/:userId', (req,res)){
//   let Project = app.models.projects
  
//   Project.find({where: {userId: req.params.userId} }, function(err, projects) {
//     if (err){
//       res.send('error')
//     } else{
//       res.send(projects)
//       // { projects
//     }

//   });
// }
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
