import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profile: {
      avatar: String,
      goal: { type: String, required: true },
    },
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);