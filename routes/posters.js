import express from 'express';
import { getAllPosters,deletePoster} from '../controllers/posters.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();
//////Read
router.get('/',verifyToken, getAllPosters);
///Delete
router.delete('/:posterId', verifyToken, deletePoster)

export default router;