const mongoose = require('mongoose');

const SiteType = `type Site {
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

module.exports = { model: mongoose.model('Site', schema), type: SiteType };
