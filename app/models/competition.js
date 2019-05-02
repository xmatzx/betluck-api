const mongoose = require('mongoose');

const competitionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Competition', competitionSchema);