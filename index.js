import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello, world!');
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
