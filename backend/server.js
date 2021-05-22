const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
//bring routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

//app
const app = express();

//db connection
mongoose
	.connect(process.env.DATABASE_LOCAL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		// useUnifiedTopology: true,
	})
	.then(() => {
		console.log('DB connected successfully');
	});

// connecting middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
if (process.env.NODE_ENV === 'development') {
	app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

//setting routes
// app.get('/api', (req, res) => {
// 	res.json({ time: Date().toString() });
// });

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
