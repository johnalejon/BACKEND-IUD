const {Router} = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const {validadorMarcaEquipo} = require('../helpers/validador-MarcaEquipo');

const router = Router();

router.post('/', async function(req,res){
    try{
        const validador =  validadorMarcaEquipo(req);
        if(validador.length>0){
            return res.status(400).send(validador);
        }
        let TipoEquipo = new TipoEquipo();

        let existTipoEquipo = await TipoEquipo.findOne({name : req.body.name});

        if(existTipoEquipo){
            return res.status(400).send("Tipo de equipo ya existente")
        }
        TipoEquipo.name = req.body.name;
        TipoEquipo.state = req.body.state;
        TipoEquipo.creationDate = new Date();
        TipoEquipo.updateDate = new Date();

        TipoEquipo =  await TipoEquipo.save();

        console.log(TipoEquipo);
        res.send(TipoEquipo);
    }catch(error){
        res.status(500).send("Ha ocurrido un error");
        console.log(error);

    };
});
router.get('/',async function(req,res){
    try{
        let existTipoEquipo = await TipoEquipo.find();
        if(!existTipoEquipo){
            return res.status(400).send("No se enncontraron tipos de equipos")
        }
        res.send(existTipoEquipo);

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }

});

router.put('/:TipoEquipoId',async function(req,res){
    try{
        const validador =  validadorMarcaEquipo(req);
        if(validador.length>0){
            return res.status(400).send(validador);
        }
        let existTipoEquipo = await TipoEquipo.findById(req.params.TipoEquipoId);
        if(!existTipoEquipo){
            return res.status(400).send("No se encontró ese tipo de equipo")
        }
        existTipoEquipo.name = req.body.name;
        existTipoEquipo.state = req.body.state;
        existTipoEquipo.updateDate = new Date();

        existTipoEquipo =  await existTipoEquipo.save();

        console.log(existTipoEquipo);
        res.send(existTipoEquipo);

    }catch(error){
        console.log(error);
        res.status(500).send("Hubo un error");

    }
    

});
router.get('/:TipoEquipoId', async function(req, res){
    try{
        const tipos = await TipoEquipo.findById(req.params.TipoEquipoId);

        if(!tipos){
            return res.status(404).send('Ha ocurrido un erro');
        };
        res.send(tipos);

    }catch(error){
        console.log(error)
    }
} )



module.exports= router;