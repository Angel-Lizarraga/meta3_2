const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursosController');

router.use(express.json());

router.get('/cursos', cursosController.getAllCursos);
router.get('/cursos/:id', cursosController.getCursos);
router.post('/cursos', cursosController.createCursos);
router.put('/cursos/:id', cursosController.updateCursos);
router.patch('/cursos/:id', cursosController.updateCursos);
router.delete('/cursos/:id', cursosController.deleteCursos);

module.exports = router;
