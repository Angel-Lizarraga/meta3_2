const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController');

router.use(express.json());

// Rutas para manejar los profesores
router.get('/profesores', profesoresController.getAllProfesores); // Correcto
router.get('/profesores/:id', profesoresController.getProfesorById); // Cambié el nombre a getProfesorById
router.post('/profesores', profesoresController.createProfesor); // Cambié el nombre a createProfesor
router.put('/profesores/:id', profesoresController.updateProfesor); // Cambié el nombre a updateProfesor
router.delete('/profesores/:id', profesoresController.deleteProfesor); // Cambié el nombre a deleteProfesor

// Rutas para inscribir o desinscribir profesores en cursos
router.post('/profesores/:id/enroll', profesoresController.enrollProfesor); // Correcto
router.post('/profesores/:id/disenroll', profesoresController.disenrollProfesor); // Correcto

// Ruta para obtener todos los cursos en los que un profesor está inscrito
router.get('/profesores/:id/cursos', profesoresController.cursosInscritosProfesor); // Correcto

// Ruta para obtener todos los estudiantes inscritos a los cursos de un profesor
router.get('/profesores/:id/estudiantes', profesoresController.getEstudiantesProfesor); // Correcto

module.exports = router;
