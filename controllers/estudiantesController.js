const modelos = require('../models/estudiantesModel');  // Asegúrate de que modelos está correctamente importado

const getAllEstudiantes = function (req, res) {
    const registros = modelos.findAll();  // Llamada directa a findAll
    res.status(200).json(registros);
};

const getEstudiante = function (req, res) {
    const id = parseInt(req.params.id);
    const registro = modelos.findById(id);  // Llamada directa a findById
    if (registro) {
        res.status(200).json(registro);
    } else {
        res.status(404).json({ error: 'Estudiante no encontrado' });
    }
};

const getEstudianteByMatricula = function (req, res) {
    const matricula = req.params.matricula;
    const registro = modelos.findByMatricula(matricula);  // Llamada directa a findByMatricula
    if (registro) {
        res.status(200).json(registro);
    } else {
        res.status(404).json({ error: 'Estudiante no encontrado por matrícula' });
    }
};

const createEstudiante = function (req, res) {
    const nuevoEstudiante = {
        id: req.body.id,
        matricula: req.body.matricula,
        nombre: req.body.nombre,
        semestre: req.body.semestre,
        creditos: req.body.creditos,
        cursos: []
    };
    const resultado = modelos.add(nuevoEstudiante);  // Llamada directa a add
    res.status(201).json(resultado);
};

const updateEstudiante = function (req, res) {
    const id = parseInt(req.params.id);
    const nuevosDatos = {
        matricula: req.body.matricula,
        nombre: req.body.nombre,
        semestre: req.body.semestre,
        creditos: req.body.creditos
    };

    const registro = modelos.update(id, nuevosDatos);  // Llamada directa a update
    if (registro) {
        res.status(200).json(registro);
    } else {
        res.status(404).json({
            type: "error",
            msg: "Estudiante no encontrado"
        });
    }
};

const deleteEstudiante = function (req, res) {
    const id = parseInt(req.params.id);
    const resultado = modelos.erase(id);  // Llamada directa a erase
    if (resultado) {
        res.status(200).json({ msg: `Estudiante con id ${id} borrado correctamente` });
    } else {
        res.status(500).json({ error: `No se pudo borrar el estudiante con id ${id}` });
    }
};

const enrollEstudiante = function (req, res) {
    const estudianteId = parseInt(req.params.id);
    const cursoId = parseInt(req.body.cursoId);

    const estudiante = modelos.findById(estudianteId);  // Llamada directa a findById
    if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    const curso = modelos.cursosModel.findById(cursoId);  // Acceso a cursosModel correctamente
    if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado' });
    }

    if (!estudiante.cursos.includes(cursoId)) {
        estudiante.cursos.push(cursoId);
        modelos.update(estudianteId, estudiante);  // Llamada directa a update
    }

    res.status(200).json({
        msg: 'Estudiante inscrito al curso exitosamente',
        cursosInscritos: estudiante.cursos
    });
};

const disenrollEstudiante = function (req, res) {
    const estudianteId = parseInt(req.params.id);
    const cursoId = parseInt(req.body.cursoId);

    const estudiante = modelos.findById(estudianteId);  // Llamada directa a findById
    if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    const curso = modelos.cursosModel.findById(cursoId);  // Acceso a cursosModel correctamente
    if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado' });
    }

    estudiante.cursos = estudiante.cursos.filter(id => id !== cursoId);
    modelos.update(estudianteId, estudiante);  // Llamada directa a update

    res.status(200).json({
        msg: 'Estudiante desinscrito del curso exitosamente',
        cursosInscritos: estudiante.cursos
    });
};

const cursosInscritosEstudiantes = function (req, res) {
    const estudianteId = parseInt(req.params.id);

    const estudiante = modelos.findById(estudianteId);  // Llamada directa a findById
    if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    const cursosInscritos = estudiante.cursos.map(cursoId => modelos.cursosModel.findById(cursoId));  // Correcto acceso a cursosModel

    res.status(200).json({
        cursos: cursosInscritos
    });
};

const getProfesoresEstudiantes = function (req, res) {
    const estudianteId = parseInt(req.params.id);

    const estudiante = modelos.findById(estudianteId);  // Llamada directa a findById
    if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    const profesoresInfo = estudiante.cursos.map(cursoId => {
        const curso = modelos.cursosModel.findById(cursoId);
        return curso ? modelos.profesoresModel.findById(curso.profeID) : undefined;
    }).filter(profesor => profesor !== undefined);

    res.status(200).json({
        profesores: profesoresInfo
    });
};

exports.getAllEstudiantes = getAllEstudiantes;
exports.getEstudiante = getEstudiante;
exports.getEstudianteByMatricula = getEstudianteByMatricula;
exports.createEstudiante = createEstudiante;
exports.updateEstudiante = updateEstudiante;
exports.deleteEstudiante = deleteEstudiante;
exports.enrollEstudiante = enrollEstudiante;
exports.disenrollEstudiante = disenrollEstudiante;
exports.cursosInscritosEstudiantes = cursosInscritosEstudiantes;
exports.getProfesoresEstudiantes = getProfesoresEstudiantes;