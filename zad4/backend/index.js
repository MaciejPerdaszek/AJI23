const express = require('express')
const app = express()
const port = 3000

const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')
const ordersRouter = require('./routes/orders')
const statusRouter = require('./routes/status')
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.get('/', (req, res) => {
  res.json({'status':'working!'});
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/products', productsRouter)
app.use('/categories', categoriesRouter)
app.use('/orders', ordersRouter)
app.use('/status', statusRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})