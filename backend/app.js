const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); //user cred saved in cookie
const morgan = require('morgan');
const expressValidator = require('express-validator'); 
const  cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require("dotenv").config();

//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/products');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');

//swagger
const swaggerOptions = {

  swaggerDefinition: {
    info: {
      title: 'shopping cart API',
      description: "shopping cart API Information",
      contact: {
        name: "Mitali Pawaskar"
      },
      servers: ["http://localhost:8000"]
    }
  },
  apis: ['./routes/*.js']
};


const specs = swaggerJsDoc(swaggerOptions); //allows us to pass config into swaggerJsDoc

//db
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true ,useUnifiedTopology: true  })
   .then(()=>console.log('DB connected'))

//app
const app = express();

//to handle CORS errors
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST,PUT,DELETE,PATCH');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//middleware
app.use(morgan('dev')); //log
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator()); //used to get userfriendly error msg validation

//Routes which handles request i.e middleware
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',braintreeRoutes);
app.use('/api',orderRoutes);

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(specs));


module.exports = app;