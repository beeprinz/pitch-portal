'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);

  // const User = server.loopback.model.User

  // User.create(
  //   { username: 'ocaAdmin', email: 'oca@pitchportal.com', password: '12345' },

  //   function(err, user) {
  //     if (err) return debug('%j', err);
  //     //...
  //     // 
  //     //...
  //     // 
  //     Role.create(
  //       {
  //         name: 'admin'
  //       },
  //       function(err, role) {
  //         if (err) return debug(err);
  //         debug(role);

  //         // Make Bob an admin
  //         role.principals.create(
  //           {
  //             principalType: RoleMapping.USER,
  //             principalId: user.id
  //           },
  //           function(err, principal) {
  //             if (err) return debug(err);
  //             debug(principal);
  //           }
  //         );
  //       }
  //     );
  //   }
  // );
};
