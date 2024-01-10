import express from 'express';
import { getUser,getAllUsers} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

//Read
router.get('/:id',verifyToken, getUser);
router.get('/',verifyToken, getAllUsers);
getAllUsers
//Update
export default router;