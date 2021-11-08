import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  exam: { type: Schema.Types.ObjectId, ref: 'Exam' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  update_at: { type: Date, default: Date.now() },
  result: { type: String },
  create_at: { type: Date, default: Date.now() },
});

const Result = mongoose.model('Result', resultSchema);

export default Result;
