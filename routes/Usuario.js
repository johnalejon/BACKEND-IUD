const {Router} = require('express');
const Usuario = require('../models/Usuario');
const {validadorUsuario} = require('../helpers/Validador-Ususario');

const router = Router();

router.post('/',async function  (req,res){
   
    try{
        const validador = validadorUsuario(req);
       if(validador.length>0){
           return res.status(400).send(validador);


       }
        console.log('Objeto recibico',req.body);
        let Usuario = new Usuario();

        const emailExists = await Usuario.findOne({email : req.body.email });
        console.log(emailExists);
        if (emailExists){
            return res.status(400).send("Email ya existe");
            
        }

        Usuario.name = req.body.name;
        Usuario.email= req.body.email;
        Usuario.state= req.body.state;
        Usuario.creationDate= new Date();
        Usuario.updateDate= new Date();
        Usuario = await Usuario.save();
        res.send(Usuario);
    }catch (error){
        res.status(500).send('ocurrio un error');
        console.log(error);
    }
    
});

router.get('/',async function(req,res){
    try{
        const Usuario = await Usuario.find();
        res.send(Usuario);
        

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }

});


router.put('/:UsuarioId',async function(req,res){
    try{
        const validador = validadorUsuario(req);
       if(validador.length>0){
           return res.status(400).send(validador);


       }
        let Usuario = await Usuario.findById(req.params.UsuarioId);
        if(!Usuario){
           return  res.status(400).send("No se encontró un usuario con ese id");
        };

        const emailVerify = await Usuario.findOne({email: req.body.email, _id:{ $ne: Usuario._id}});
        if(emailVerify){
           return  res.status(400).send("El correo está siendo utilizado por otro usuario");
        }
        Usuario.name = req.body.name;
        Usuario.email= req.body.email;
        Usuario.state= req.body.state;
        Usuario.updateDate= new Date();
        Usuario = await Usuario.save();
        res.send(Usuario);


    

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
        }

});
router.get('/:UsuarioId', async function(req, res){
    try{
        const Usuarios = await Usuario.findById(req.params.UsuarioId);

        if(!Usuarios){
            return res.status(404).send('Ha ocurrido un erro');
        };
        res.send(Usuarios);

    }catch(error){
        console.log(error)
    }
} )



module.exports= router;