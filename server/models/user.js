import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  admin: Boolean,
  email: String,
  hash: String,
});

userSchema.methods.generateHash = (email) => {
  this.hash = crypto.createHash('md5').update(email).digest('hex');
  this.save();
};

export default mongoose.model('User', userSchema);
