import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import path from 'path';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(path.resolve(), 'dist')));
app.use('/api', router);

app.get('*', (req, res) => {
	res.sendFile(path.join(path.resolve(), 'dist', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

export default app;
