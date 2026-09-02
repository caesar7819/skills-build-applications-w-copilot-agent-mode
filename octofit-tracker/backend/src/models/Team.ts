import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    motto: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Team', teamSchema);