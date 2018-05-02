const Company = require('./company.model');
const Site = require('./site.model');
const Role = require('./role.model');
const User = require('./user.model');

module.exports = {
  Company: Company.model,
  CompanyType: Company.type,
  Site: Site.model,
  SiteType: Site.type,
  Role: Role.model,
  RoleType: Role.type,
  User: User.model,
  UserType: User.type,
};
