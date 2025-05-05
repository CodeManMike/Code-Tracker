const mongoose = require('mongoose');

const CodeStatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  repository: {
    type: String,
    required: true
  },
  linesAdded: {
    type: Number,
    default: 0
  },
  linesDeleted: {
    type: Number,
    default: 0
  },
  commitCount: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure unique stats per user and repository
CodeStatSchema.index({ user: 1, repository: 1 }, { unique: true });

module.exports = mongoose.model('CodeStat', CodeStatSchema);
