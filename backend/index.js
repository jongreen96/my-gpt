const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

const conversationsRouter = require('./routes/conversations');
app.use('/api/conversations', conversationsRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
