const express = require('express')
const app = express()
const port = 3000

const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')
const ordersRouter = require('./routes/orders')
const statusRouter = require('./routes/status')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/products', productsRouter)
app.use('/categories', categoriesRouter)
app.use('/orders', ordersRouter)
app.use('/status', statusRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})