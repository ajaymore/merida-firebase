const mongoose = require('mongoose');

const CompanyType = `type Company {
  _id: ID
  name: String
  sites: [Site]
  users: [User]
  createdAt: Date
  updatedAt: Date
}`;

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  sites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Site' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

module.exports = { model: mongoose.model('Company', schema), type: CompanyType };
