const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true,
         minlength: 4
        },
    userName: { 
        type: String, 
        required: true, 
        minlength: 4, 
        maxlength: 10, 
        unique: true 
        },
    dob: { 
        type: String,
        required: true 
        },
    email: { 
        type: String, 
        required: true, 
        unique: true
        },
    mobile: { 
        type: String, 
        required: true, 
        unique: true, 
        minlength: 10, 
        maxlength: 10 
        },
    pwd: { 
        type: String, 
        required: true, 
        minlength: 6 
        },
    tokens: [{
        token: {
                type: String,
                required: true
            }
        }],
    cart: {
        items: [
            {
                productId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Product',
                  required: true
                },
                quantity: { type: Number, required: true }
            }
            ]
          }
     
});

userSchema.methods.generatingAuthToken =async function() { 
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'jwtPrivateKey')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
};

userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
  
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: product._id,
        quantity: newQuantity
      });
    }
    const updatedCart = {
      items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
  };
  
  userSchema.methods.removeFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
  };
  
  userSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
  };
  
module.exports = mongoose.model("User",userSchema);
