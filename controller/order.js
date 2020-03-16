const Order = require('../models/order');
const User = require('../models/user');

exports.postOrder = (req,res,next) => {
    let totalSum = 0;
    const user = await User.findOne(req.query);
    user.populate('user.cart')
    .then(user => {
        user.cart.forEach(prod => {
            totalSum+= prod.qty*prod.productId.price;
        });

        const products = user.cart.map(i => {
            return { qty: i.qty, product: { ...i.productId._doc } };
          });
          const order = new Order({
            user: {
              email: req.user.email,
              userId: req.query
            },
            products: products
          });
          return order.save();
    
    })
}