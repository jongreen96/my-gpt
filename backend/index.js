const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authenticateToken = require('./utils/jwt');

const app = express();
app.use(express.json());
app.use(cors());

const path = require('path');

app.use(express.static(path.join(__dirname, 'dist')));

const port = process.env.PORT || 3000;

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

const conversationsRouter = require('./routes/conversations');
app.use('/api/conversations', authenticateToken, conversationsRouter);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
