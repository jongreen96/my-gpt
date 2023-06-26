const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.json({ message: 'My-GPT Backend' });
});

const chatRouter = require('./routes/chat');
app.use('/chat', chatRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
