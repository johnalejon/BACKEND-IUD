const { Router } = require('express');
const Inventario = require('../models/Inventario');
const { validadorInventario } = require('../helpers/validador-Inventario');
TipoEquipo
const router = Router();

router.post('/', async function (req, res) {
    try {
        const validador = validadorInventario(req);
        if (validador.length > 0) {
            return res.status(400).send(validador);
        }
        let Inventario = new Inventario();

        const InventarioExiste = await Inventario.findOne({ serial: req.body.serial });

        if (InventarioExiste) {
            return res.status(400).send("Ya existe un inventario asociado a  ese serial");
        };

        Inventario.serial = req.body.serial;
        Inventario.model = req.body.model;
        Inventario.description = req.body.description;
        Inventario.image = req.body.image;
        Inventario.price = req.body.price;
        Inventario.Usuario = req.body.Usuario;
        Inventario.MarcaEquipo = req.body.MarcaEquipo;
        Inventario.EstadoEquipo = req.body.EstadoEquipo;
        Inventario.TipoEquipo = req.body.TipoEquipo;
        Inventario.creationDate = new Date();
        Inventario.updateDate = new Date();

        Inventario = await Inventario.save();
        res.send(Inventario);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }

});
router.get('/', async function (req, res) {
    try {
        const Inventario = await Inventario.find().populate([
            {
                path: 'Usuario'
            },
            {
                path: 'MarcaEquipo'

            },
            {
                path: 'EstadoEquipo'

            },
            {
                path:'TipoEquipo'

            }


        ]);
        res.send(Inventario);
        

    } catch (error) {
        console.log(error);
        res.status(400).send("Ha ocurrido un error");
    }
});
router.put('/:InventarioId', async function (req, res) {
    try {
        const validador = validadorInventario(req);
        if (validador.length > 0) {
            return res.status(400).send(validador);
        }

        let Inventario = await Inventario.findById(req.params.InventarioId);
        if (!Inventario) {
            return res.status(400).send("no existe un inventario con ese id");
        }

        const serialExist = await Inventario.findOne({ serial: req.body.serial, _id: { $ne: Inventario._id } });
        console.log(serialExist);
        if (serialExist) {
            return res.status(400).send("Ya existe un inventario asociado a  ese serial");
        };
        Inventario.serial = req.body.serial;
        Inventario.model = req.body.model;
        Inventario.description = req.body.description;
        Inventario.image = req.body.image;
        Inventario.price = req.body.price;
        Inventario.Usuario = req.body.Usuario;
        Inventario.MarcaEquipo = req.body.MarcaEquipo;
        Inventario.EstadoEquipo = req.body.EstadoEquipo;
        Inventario.TipoEquipo = req.body.TipoEquipo;
        Inventario.updateDate = new Date();
        

        Inventario = await Inventario.save();
        res.send(Inventario);


    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
        ;
    }


});

router.get('/:InventarioId', async function(req, res){
    try{
        const inventor = await Inventario.findById(req.params.InventarioId);

        if(!inventor){
            return res.status(404).send('Ha ocurrido un erro');
        };
        res.send(inventor);

    }catch(error){
        console.log(error)
    }
} )



module.exports = router;