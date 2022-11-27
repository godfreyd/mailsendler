const { Schema, model } = require('mongoose');

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

// TODO: добавить iP-адресс, FingerPrint браузера
module.exports = model('Token', TokenSchema);