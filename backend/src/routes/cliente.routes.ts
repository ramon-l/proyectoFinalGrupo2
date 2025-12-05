import express from 'express'
import { getAllclientes,createClientes,deleteClientes,getclienteById,updateClientes } from '../controllers/clientes.controller';
const router = express.Router()

router.get('/clientes', getAllclientes);
router.get('/clientes/:id', getclienteById);
router.post('/clientes', createClientes);
router.put('/clientes/:id', updateClientes);
router.delete('/clientes/:id', deleteClientes);

export default router;