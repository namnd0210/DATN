import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: { type: String, required: true, max_length: 100, unique: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'User' },
  // exam: { type: Schema.Types.ObjectId, ref: 'Exam' },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  updated_at: { type: Date },
  created_at: { type: Date, default: Date.now() },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Class = mongoose.model('Class', classSchema);

export default Class;
