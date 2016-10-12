import mongoose from 'mongoose';

const LevelSchema = new mongoose.Schema({
  difficulty: Number,
  order_in_difficulty: Number,
  order_in_all: Number,
  word: Number,
  phase: Number,
  speed: {
    standard: Number,
    one: Number,
    two: Number,
    three: Number
  },
  error: Number,
  bonus: {
    item_xp: Number,
    diamond_item_xp: Number,
    capital_item_xp: Number,
    number_item_xp: Number,
    symbol_item_xp: Number,
    phase_item_xp: Number,
    level_xp: Number,
    level_diamond: Number
  },
  disturb: {
    capital: Number,
    number: Number,
    symbol: Number,
    diamond: Number
  }
});

export default mongoose.model('Level', LevelSchema);
