import { Router } from 'express';
import { uploadAvatar } from '../../controllers/uploads.controller';



const router = Router();

router.post('/user', uploadAvatar);




export default router;