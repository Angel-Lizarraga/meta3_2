const cursosModel = require("../models/cursosModel");

const getAllCursos = function (req, res) {
    let registros = cursosModel.findAll();
    res.status(200).json(registros);
};

const getCursos = function (req, res) {
    const id = req.params.id;
    let registro = cursosModel.findById(id);
    if (registro) {
        res.status(200).json(registro);
    } else {
        res.status(404).json({ error: 'Curso con id no encontrado' });
    }
};

const deleteCursos = function (req, res) {
    const id = req.params.id;
    let resultado = cursosModel.erase(id);
    if (resultado) {
        res.status(200).json({ msg: `Curso con id: ${id} eliminado exitosamente` });
    } else {
        res.status(500).json({ error: `No se pudo eliminar el curso con id: ${id}` });
    }
};

const createCursos = function (req, res) {
    const curso = {
        id: req.body.id,
        nombre: req.body.nombre,
        clave: req.body.clave,
        creditos: req.body.creditos,
        profeID: req.body.profeID 
    };

    let resultado = cursosModel.add(curso);
    res.status(201).json(resultado);
};


const updateCursos = function (req, res) {
    const id = req.params.id;
    const data = {
        id: req.body.id,
        nombre: req.body.nombre,
        clave: req.body.clave,
        creditos: req.body.creditos,
        profeID: req.body.profeID
    };

    let registro = cursosModel.update(id, data);
    
    if (registro) {
        res.status(200).json(registro);
    } else {
        res.status(404).json({
            type: "error",
            msg: "Curso con el id no encontrado"
        });
    }
};



exports.getAllCursos = getAllCursos;
exports.getCursos = getCursos;
exports.createCursos = createCursos;
exports.updateCursos = updateCursos;
exports.deleteCursos = deleteCursos;
