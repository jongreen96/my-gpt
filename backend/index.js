const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

const chatRouter = require('./routes/chat');
app.use('/api/chat', chatRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
