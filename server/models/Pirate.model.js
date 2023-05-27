const mongoose = require('mongoose');

const PirateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  treasureChests: { type: Number, required: true },
  catchPhrase: { type: String, required: true },
  crewPosition: { type: String, required: true },
  pegLeg: { type: Boolean, default: true },
  eyePatch: { type: Boolean, default: true },
  hookHand: { type: Boolean, default: true },
  
}, {
  timestamps: true,
});

module.exports = mongoose.model('Pirate', PirateSchema);