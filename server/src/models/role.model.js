const mongoose = require('mongoose');

const RoleType = `type Role {
  _id: ID
  name: String
  users: [User]
  createdAt: Date
  updatedAt: Date
}`;

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

schema.post('remove', async (doc, next) => {
  next(null, doc);
});

schema.post('save', async (doc, next) => {
  next(null, doc);
});

module.exports = { model: mongoose.model('Role', schema), type: RoleType };
