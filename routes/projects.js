import express from 'express';
import { getAllProjects,deleteProject} from '../controllers/projects.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();
//////Read
router.get('/',verifyToken, getAllProjects);
///Delete
router.delete('/:projectId', verifyToken, deleteProject)

export default router;