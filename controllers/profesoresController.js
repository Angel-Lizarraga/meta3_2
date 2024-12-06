const modelos = require("../models/profesoresModel");
const modelosCursos = require("../models/cursosModel");
const modelosEstudiantes = require("../models/estudiantesModel");

const getAllProfesores = function (req, res) {
    let registros = modelos.findAll();  // Accediendo directamente a la función findAll
    res.status(200).json(registros);
};

const getProfesorById = function (req, res) {
    const id = req.params.id;
    let registro = modelos.findById(id);  // Accediendo directamente a la función findById
    if (registro) {
        res.status(200).json(registro);
    } else {
        res.status(404).json({ error: 'Profesor no existente' });
    }
};

const createProfesor = function (req, res) {
    const profesor = {
        id: req.body.id,
        nombre: req.body.nombre,
        matEmpleado: req.body.matEmpleado,
        cursos: []
    };

    let resultado = modelos.add(profesor);  // Accediendo directamente a la función add
    res.status(201).json(resultado);
};

const updateProfesor = function (req, res) {
    const id = parseInt(req.params.id);
    const data = {
        nombre: req.body.nombre,
        matEmpleado: req.body.matEmpleado,
    };

    let registro = modelos.update(id, data);  // Accediendo directamente a la función update

    if (registro) {
        res.status(200).json(registro);
    } else {
        res.status(404).json({
            type: "error",
            msg: "Id no encontrado"
        });
    }
};

const deleteProfesor = function (req, res) {
    const id = req.params.id;
    let resultado = modelos.erase(id);  // Accediendo directamente a la función erase
    if (resultado) {
        res.status(200).json({ msg: `Profesor con id: ${id} eliminado exitosamente` });
    } else {
        res.status(500).json({ error: `No se pudo eliminar el profesor con id: ${id}` });
    }
};

const enrollProfesor = function (req, res) {
    const profesorId = req.params.id;
    const cursoId = req.body.cursoId;

    let profesor = modelos.findById(profesorId);  // Accediendo directamente a la función findById
    if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    let curso = modelosCursos.findById(cursoId);  // Accediendo directamente a la función findById de cursos
    if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado' });
    }

    if (!profesor.cursos.includes(cursoId)) {
        profesor.cursos.push(cursoId);
        modelos.update(profesorId, profesor);  // Accediendo directamente a la función update
        curso.profeID = profesorId;
        modelosCursos.update(cursoId, curso);  // Accediendo directamente a la función update de cursos
    }

    res.status(200).json({
        msg: 'Profesor asignado exitosamente en el curso',
        cursos: profesor.cursos
    });
};

const disenrollProfesor = function (req, res) {
    const profesorId = req.params.id;
    const cursoId = req.body.cursoId;

    let profesor = modelos.findById(profesorId);  // Accediendo directamente a la función findById
    if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    let curso = modelosCursos.findById(cursoId);  // Accediendo directamente a la función findById de cursos
    if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado' });
    }

    profesor.cursos = profesor.cursos.filter(id => id !== cursoId);
    curso.profeID = null;
    modelos.update(profesorId, profesor);  // Accediendo directamente a la función update
    modelosCursos.update(cursoId, curso);  // Accediendo directamente a la función update de cursos

    res.status(200).json({
        msg: 'Profesor desinscrito exitosamente del curso',
        cursos: profesor.cursos
    });
};

const cursosInscritosProfesor = function (req, res) {
    const profesorId = req.params.id;

    let profesor = modelos.findById(profesorId);  // Accediendo directamente a la función findById
    if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    const cursosInfo = profesor.cursos.map(cursoId => modelosCursos.findById(cursoId)).filter(curso => curso !== undefined);

    res.status(200).json({ cursos: cursosInfo });
};

const getEstudiantesProfesor = function (req, res) {
    const profesorId = req.params.id;

    let profesor = modelos.findById(profesorId);  // Accediendo directamente a la función findById
    if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    const estudiantesInscritos = modelosEstudiantes.findAll().filter(estudiante =>
        estudiante.cursosInscritos.some(cursoId => profesor.cursos.includes(cursoId))
    );

    res.status(200).json({ estudiantes: estudiantesInscritos });
};

exports.getAllProfesores = getAllProfesores;
exports.getProfesorById = getProfesorById;
exports.createProfesor = createProfesor;
exports.updateProfesor = updateProfesor;
exports.deleteProfesor = deleteProfesor;
exports.enrollProfesor = enrollProfesor;
exports.disenrollProfesor = disenrollProfesor;
exports.cursosInscritosProfesor = cursosInscritosProfesor;
exports.getEstudiantesProfesor = getEstudiantesProfesor;
