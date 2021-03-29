const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: String,
    rating: {type: Number, min: 1, max: 5, default: 5},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvater: String
  }, {
    timestamps: true
  });

const beerSchema = new Schema({
    title: String,
    typeBeer: {
        type: String,
        enum: ['Pale Lager and Pilsner', 'Pale Ale', 'India Pale Ale', 'Porter', 'Stout', 'Belgian-Style Ale', 'Sour Ale'],
        default: 'India Pale Ale'
    },
    beerPercent: Number,
    brewery: String,
    reviews: [reviewSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Beer', beerSchema);
