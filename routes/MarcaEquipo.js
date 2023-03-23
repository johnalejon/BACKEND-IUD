const {Router} = require('express');
const MarcaEquipo = require('../models/MarcaEquipo');
const router = Router();
const {validadorMarcaEquipo} = require('../helpers/validador-MarcaEquipo');


router.post('/', async function(req,res){
    try{
        const validador =  validadorMarcaEquipo(req);
       if(validador.length>0){
           return res.status(400).send(validador);
       }
        let MarcaEquipo = new Brand();

        const existBrand = await Brand.findOne({name: req.body.name});
        if(existBrand){
            return res.status(400).send("Marca ya existente");
        }

        MarcaEquipo.name = req.body.name;
        MarcaEquipo.state = req.body.state;
        MarcaEquipo.creationDate = new Date();
        MarcaEquipo.updateDate = new Date();

        MarcaEquipo = await MarcaEquipo.save();
        res.send(MarcaEquipo);
    }catch(error){
        res.status(500).send("Ha ocurrido un error");
        console.log(error);
    }

});
router.get('/', async function(req,res){
    try{
        const MarcaEquipo = await Brand.find();
        res.send(MarcaEquipo);

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }

});
router.put('/:idMarcaEquipo', async function(req,res){
    try{
        const validador =  await validadorMarcaEquipo(req);
       if(validador.length>0){
           return res.status(400).send(validador);
       }
        let MarcaEquipo = await MarcaEquipo.findById(req.params.idMarcaEquipo);
       

        if(!MarcaEquipo){
            res.status(400).send("Marca no encontrada");
        };

        MarcaEquipo.name = req.body.name;
        MarcaEquipo.state = req.body.state;
        MarcaEquipo.updateDate = new Date();

        MarcaEquipo = await MarcaEquipo.save();
        res.send(MarcaEquipo);



    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }

});
router.get('/:MarcaEquipoId', async function(req, res){
    try{
        const MarcaEquipoi = await MarcaEquipo.findById(req.params.MarcaEquipoId);

        if(!MarcaEquipoi){
            return res.status(404).send('Ha ocurrido un erro');
        };
        res.send(MarcaEquipoi);

    }catch(error){
        console.log(error)
    }
} )



module.exports= router;