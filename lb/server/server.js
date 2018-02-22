'use strict';
// import Cookies from 'cookies-js'
// threw syntax error
var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');
var axios = require('axios');

var app = (module.exports = loopback());

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

app.get('/fetchprojects/:userId', (req, res) => {
  let Projects = app.models.project;
  console.log(req.params.userId);

  Projects.find({ where: { userId: req.params.userId } }, function(
    err,
    projects
  ) {
    if (err) {
      res.send(err);
    } else {
      res.send(projects);
    }
  });

  app.get('/allProjects', (req, res) => {
    let Projects = app.models.project;
    let Users = app.models.user;
    Projects.find((err, projects) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(projects);
        axios.get('http://localhost:3000/api/users/').then(users => {
          return res.send({ users: users.data, projects });
        });
      }
    });
  });
  app.post('/customSignUp', (req, res, next) => {
    let loginInfo = {
      email: req.body.email,
      password: req.body.password
    };
    let User = app.models.User;

    User.create(
      {
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        company: req.body.company,
        website: req.body.website,
        info: req.body.info,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position
      },
      (err, userInstance) => {
        if (err) {
          console.log('Error in User.create: ', err);
        } else {
          axios
            .post('http://localhost:3000/api/users/login', loginInfo)
            .then(response => res.send(response.data));
        }
      }
    );
  });

  app.post('/login', (req, res) => {
    // User Model Defined
    let User = app.models.User;
    let userInfo = req.body;
    User.login({ email: userInfo.email, password: userInfo.password }, function(
      err,
      token
    ) {
      if (err) {
        res.status(404).send('404');
      } else {
        res.send(token);
      }
    });
  });

  // app.get('/getprojects/:userId', (req,res)){
  //   let Project = app.models.projects

  app.post('/createproject', (req, res) => {
    // console.log(req.body)
    // Projects Defined Model
    let Project = app.models.project;
    let newProject = req.body;
    Project.create(newProject, (err, project) => {
      if (err) {
        res.send(err);
      } else {
        console.log(project);
        res.send(project);
      }
    });
  });

  // Bootstrap the application, configure models, datasources and middleware.
  // Sub-apps like REST API are mounted via boot scripts.
  boot(app, __dirname, function(err) {
    if (err) throw err;

    // start the server if `$ node server.js`
    if (require.main === module) app.start();
  });
});
