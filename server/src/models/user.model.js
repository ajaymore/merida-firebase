const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  displayName: { type: String, required: true },
  uid: { type: String, required: true },
  email: { type: String, required: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const UserType = `type User {
  _id: ID
  displayName: String
  uid: String
  email: String
  roles: [Role]
  isAdmin: Boolean
  createdAt: Date
  updatedAt: Date
}`;

module.exports = { model: mongoose.model('User', schema), type: UserType };
