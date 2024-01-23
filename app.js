require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const { EH } = require('./middlewares');
const { userRoutes, productRoutes, categoryRoutes, adminRoutes, orderRoutes } = require('./routes');

const app = express();
const PORT = process.env.PORT;

const logFile = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(express.json());
app.use(logger('combined', { stream: logFile })); // can be customized!
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/order', orderRoutes);
app.use(EH.globalErrorHandler);

app.get('/', (req, res) => {
    res.send('Salam');
})

app.all('*', (req, res) => {res.send('404 - NOT FOUND')});

app.listen(PORT, () => {console.log(`server is running on port: ${PORT} !`)});