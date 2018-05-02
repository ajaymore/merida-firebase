const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  displayName: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  uid: { type: String, required: true },
  email: { type: String, required: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  superAdmin: { type: Boolean, default: false },
  companyAdmin: { type: Boolean, default: false },
  sites: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const UserType = `type User {
  _id: ID
  displayName: String
  company: Company
  uid: String
  email: String
  roles: [Role]
  superAdmin: Boolean
  companyAdmin: Boolean
  sites: [Site]
  createdAt: Date
  updatedAt: Date
}`;

module.exports = { model: mongoose.model('User', schema), type: UserType };
