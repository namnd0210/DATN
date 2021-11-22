import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const assignmentResultSchema = new Schema({
  content: { type: String, required: true },
  images: [{ type: String }],
  point: { type: Number },
  assignment: { type: Schema.Types.ObjectId, ref: 'Assignment' },
  due_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now() },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
});

const AssignmentResult = mongoose.model('AssignmentResult', assignmentResultSchema);

export default AssignmentResult;
