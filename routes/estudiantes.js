const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');
router.use(express.json());

router.get('/estudiantes', estudiantesController.getAllEstudiantes);
router.get('/estudiantes/:id', estudiantesController.getEstudiante);
router.get('/estudiantes/matricula/:matricula', estudiantesController.getEstudianteByMatricula);
router.post('/estudiantes', estudiantesController.createEstudiante);
router.put('/estudiantes/:id', estudiantesController.updateEstudiante);
router.patch('/estudiantes/:id', estudiantesController.updateEstudiante);
router.delete('/estudiantes/:id', estudiantesController.deleteEstudiante);
router.patch('/estudiantes/:id/inscribir', estudiantesController.enrollEstudiante);
router.patch('/estudiantes/:id/desinscribir', estudiantesController.disenrollEstudiante);
router.get('/estudiantes/:id/cursos', estudiantesController.cursosInscritosEstudiantes);
router.get('/estudiantes/:id/profesores', estudiantesController.getProfesoresEstudiantes);

module.exports = router;
