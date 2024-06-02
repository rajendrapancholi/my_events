import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    unique: [true, 'Name is already exists!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: [true, 'Email is already exists!'],
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
  },
  image: {
    type: String,
  },
  isAdmin: { type: Boolean, required: true, default: false },
});

const User = models.User || model('User', UserSchema);

export default User;
