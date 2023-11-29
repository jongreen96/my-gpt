import express from 'express';
import userRouter from './userRoutes.js';
const router = express.Router();

router.use(userRouter);

router.all('*', (req, res) => {
	res.status(404).json({
		status: 404,
		message: `The route ${req.path} does not exist!`,
	});
});

export default router;
