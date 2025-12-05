import express from 'express'
import { createcatalogo, deletecatalogo, getAllcatalogo, getcatalogoById, updatecatalogo } from '../controllers/catalogo.controller';
const router = express.Router()

router.get('/catalogo', getAllcatalogo);
router.get('/catalogo/:id', getcatalogoById);
router.post('/catalogo', createcatalogo);
router.put('/catalogo/:id', updatecatalogo);
router.delete('/catalogo/:id', deletecatalogo);

export default router;