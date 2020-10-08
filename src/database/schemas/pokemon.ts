import mongoose, { Schema } from 'mongoose';

export default mongoose.model(
  'Pokemon',
  new Schema({
    id: Number,
    name: String,
  }),
);
