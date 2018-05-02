const Role = require('./role.model');
const User = require('./user.model');

module.exports = {
  Role: Role.model,
  RoleType: Role.type,
  User: User.model,
  UserType: User.type,
};
