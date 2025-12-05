import express from 'express'
import { createventas, deleteventas, getAllventas, getventaById, updateventas } from '../controllers/ventas.controller';
const router = express.Router()

router.get('/ventas', getAllventas);
router.get('/ventas/:id', getventaById);
router.post('/ventas', createventas);
router.put('/ventas/:id', updateventas);
router.delete('/ventas/:id', deleteventas);

export default router;