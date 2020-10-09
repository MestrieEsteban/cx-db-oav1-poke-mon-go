import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  id: Number,
  pokeId: Number,
  name: String,
  sprite: String,
  description: String,
  types: Array,
  abilities: Object,
  family: Object,
  starter: Boolean,
  legendary: Boolean,
  mythical: Boolean,
  mega: Boolean,
  generation: Number,
});

export default mongoose.model('Pokemon', schema);
