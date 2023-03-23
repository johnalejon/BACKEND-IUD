const {Router} = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const {validadorMarcaEquipo} = require('../helpers/validador-MarcaEquipo');

const router = Router();

router.post('/',async function(req,res){
    try{
        const validador = validadorMarcaEquipo(req);
        if(validador.length>0){
            return res.status(400).send(validador);
        }
        let EstadoEquipo =  EstadoEquipo();

        const existEstadoEquipo = await EstadoEquipo.findOne({name: req.body.name});
        if(existEstadoEquipo){
            return res.status(400).send("Estado de equipos ya existente");
        };

        EstadoEquipo.name = req.body.name;
        EstadoEquipo.state = req.body.state;
        EstadoEquipo.creationDate = new Date();
        EstadoEquipo.updateDate = new Date();

        EstadoEquipo = await EstadoEquipo.save();

        console.log(EstadoEquipo);
        res.send(EstadoEquipo);



    }catch(error){
        res.status(500).send("Ha ocurrido un error");
        console.log(error)
    }

});

router.get('/',async function(req,res){
    try{
        const EstadoEquipo = await EstadoEquipo.find();
        
        res.send(EstadoEquipo);

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }


});
router.put('/:EstadoEquipoId',async function(req,res){
    try{
        const validador =  validadorMarcaEquipo(req);
        if(validador.length>0){
            return res.status(400).send(validador);
        }
        let EstadoEquipo = await EstadoEquipo.findById(req.params.EstadoEquipoId);

        if(!EstadoEquipo){
            res.status(400).send("Estado de equipo no encontrado");
        };
        EstadoEquipo.name = req.body.name;
        EstadoEquipo.state = req.body.state;
        EstadoEquipo.updateDate = new Date();

        EstadoEquipo = await EstadoEquipo.save();

        console.log(EstadoEquipo);
        res.send(EstadoEquipo);


    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");

    }

});
router.get('/:EstadoEquipoId', async function(req, res){
    try{
        const estados = await EstadoEquipo.findById(req.params.EstadoEquipoId);

        if(!estados){
            return res.status(404).send('Ha ocurrido un erro');
        };
        res.send(estados);

    }catch(error){
        console.log(error)
    }
} )

module.exports= router;