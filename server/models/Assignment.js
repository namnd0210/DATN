import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  description: { type: string, required: true },
  images: [{ type: string }],
  comments: { type: Schema.Types.ObjectId, ref: 'Comment' },
  point: { type: Number },
  updated_at: { type: Date },
  created_at: { type: Date, default: Date.now() },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
