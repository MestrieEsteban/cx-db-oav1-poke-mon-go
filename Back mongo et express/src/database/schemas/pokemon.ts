import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  id: Number,
  pokeId: Number,
  name: String,
  sprite: String,
  description: String,
  types: Array,
  height: String,
  weight: String,
  weaknesses: Array,
  nextEvolution: Array,
});

export default mongoose.model('Pokemon', schema);
