'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);

  const User = server.models.user;
  const Role = server.models.Role;
  const RoleMapping = server.models.RoleMapping;

  //Find or create the admin
  User.findOne({where: {email: 'oca@pitchportal.com' } }, (err, user) => {
    if (!user) {
      User.create({
        username: 'ocaAdmin',
        email: 'oca@pitchportal.com', 
        password: '12345',
        company: 'OCA',
        firstName: 'Tupac',
        lastName: 'Shakur'
      }, (err, user) => {
          if (err) throw err;
          //Find or create the admin role
          Role.findOrCreate({ name: 'admin' }, (err, role) => {
              if (err) throw err;
              // Assign the admin to the admin role
              role.principals.create({ principalType: RoleMapping.USER, principalId: user.id });
          });
        }
      );
    }
  });
};
