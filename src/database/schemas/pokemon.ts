import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  id: Number,
  name: String,
});

export default mongoose.model('Pokemon', schema);
