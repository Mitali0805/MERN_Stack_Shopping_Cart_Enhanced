const {Order, CartItem} = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

exports.orderById= (req, res, next, id) => {
  Order.findById(id)
  .populate('products.product','name price')
  .exec((err,order) =>{
      if(err || !order) {
          return res.status(400).json({
              error:errorHandler(error)
          });
      }
      req.order = order;
      next();
  })
}

exports.create = (req,res) =>{
   console.log('CREATE ORDER:',req.body);
   req.body.order.user = req.profile;
   const order = new Order(req.body.order);
   order.save((error,data) =>{
       if(error) {
           return res.status(400).json({
               error: errorHandler(error)
           })
       }
       // User.find({ categories: { $in: categories } }).exec((err, users) => {}
       console.log('ORDER IS JUST SAVED >>> ', order);
       // send email alert to admin
       const emailData = {
        to: 'mitalipawaskar98@gmail.com', // admin
        from: 'mitalipawaskar98@gmail.com', //verified user on sendgrid
        subject: `A new order is received`,
        html: `
        <h1>Hey Admin, Somebody just made a purchase in your E-Shopping Zone</h1>
        <h2>Customer name: ${order.user.name}</h2>
        <h2>Customer address: ${order.address}</h2>
        <h2>User's purchase history: ${order.user.history.length} purchase</h2>
        <h2>User's email: ${order.user.email}</h2>
        <h2>Total products: ${order.products.length}</h2>
        <h2>Transaction ID: ${order.transaction_id}</h2>
        <h2>Order status: ${order.status}</h2>
        <h2>Product details:</h2>
        <hr />
        ${order.products
            .map(p => {
                return `<div>
                    <h3>Product Name: ${p.name}</h3>
                    <h3>Product Price: ${p.price}</h3>
                    <h3>Product Quantity: ${p.count}</h3>
            </div>`;
            })
            .join('--------------------')}
        <h2>Total order cost: ${order.amount}<h2>
        <p>Login to your dashboard</a> to see the order in detail.</p>
    `
    };
    sgMail.send(emailData)
    .then(sent =>console.log('SENT >>>',sent))
    .catch(err => console.log('ERR >>>',err));

     //email to buyer
     const emailData2 = {
            to: order.user.email,
            from: 'mitalipawaskar98@gmail.com',
            subject: `You order is in process`,
            html: `
            <h1>Hey ${req.profile.name}, Thank you for shopping with E-Shopping.</h1>
            <h2>Total products: ${order.products.length}</h2>
            <h2>Transaction ID: ${order.transaction_id}</h2>
            <h2>Order status: ${order.status}</h2>
            <h2>Product details:</h2>
            <hr />
            ${order.products
                .map(p => {
                    return `<div>
                        <h3>Product Name: ${p.name}</h3>
                        <h3>Product Price: ${p.price}</h3>
                        <h3>Product Quantity: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}                
            <h2>Total order cost: ${order.amount}<h2>
            <p>Thank your for shopping with us.</p>
        ` 
     };        //.join() return array as string
       sgMail.send(emailData2)
       .then(sent => console.log('SENT2>>>',sent))
       .catch(err=> console.log('ERR2 >>>',err));


       res.json(data);
   });
};

// list of orders
exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-createdAt')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
};

exports.getStatusValues = (req,res) => {
    res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req,res) => {
    Order.update(
        { _id: req.body.orderId}, 
        {$set: {status: req.body.status}},
        (err, order) => {
            if(err) {
                return res.status(400).json({
                    err: errorHandler(err)
                }); 
            }
            res.json(order);
        }
    );
};

exports.getFeedback = (req,res) =>{
    res.json(Order.schema.path('feedback'));
    // res.json(Order.schema.path('feedback').enumValues);
}

exports.updateFeedback = (req,res) =>{
    Order.update({_id:req.body.orderId},
        {$set: {feedback:req.body.feedback}},
        (err,order) =>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                });
            }
            res.json(order)
        }
    )
}