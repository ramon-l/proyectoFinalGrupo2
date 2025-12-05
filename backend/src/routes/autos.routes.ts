import express from 'express'
import {getAllautos,getautoById,createautos,updateautos,deleteautos} from '../controllers/autos.controller';
const router = express.Router()

router.get('/autos', getAllautos);
router.get('/autos/:id', getautoById);
router.post('/autos', createautos);
router.put('/autos/:id', updateautos);
router.delete('/autos/:id', deleteautos);

export default router;