const validadorUsuario = (req) =>{
    const validador = [];
   if(!req.body.name){
    validador.push("Debe ingresar un nombre");

   };
   if(!req.body.state){
    validador.push("Debe ingresar un estado");

    if(!req.body.email){
        validador.push("Es necesario un email");
    }

};
return validador;

};


module.exports={
    validadorUsuario,
}