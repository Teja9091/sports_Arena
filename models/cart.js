const mongoose = require('mongoose');
const modelName = 'Cart';

const cartSchema =new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	items: [{
		productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
		quantity: {type: Number, default: 1},
	}],
	total: {type: Number, default: 0}
});


cartSchema.statics.add = (condition) => {
    return this.model(modelName).find(condition);
};

module.exports = mongoose.model(modelName,cartSchema);
