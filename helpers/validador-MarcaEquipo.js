const validadorMarcaEquipo = (req) =>{
    const validador = [];
   if(!req.body.name){
    validador.push("Debe ingresar un nombre");

   };
   if(!req.body.state){
    validador.push("Debe ingresar un estado");

};
return validador;

};


module.exports={
    validadorMarcaEquipo,
}