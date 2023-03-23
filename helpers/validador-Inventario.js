const validadorInventario = (req) => {
    const validador = [];

    if(!req.body.serial){
        validador.push("Es necesario el serial");
    };
    if(!req.body.model){
        validador.push("Es necesario el modelo");
    };
    if(!req.body.description){
        validador.push("Es necesario la descripcion");
    };
    if(!req.body.image){
        validador.push("Es necesario la imagen");
    };
    if(!req.body.price){
        validador.push("Es necesario el precio");
    };
    if(!req.body.brand){
        validador.push("Es necesario la marca");
    };
    if(!req.body.equipmentStatus){
        validador.push("Es necesario el estado del equipo");
    };
    if(!req.body.equipmentType){
        validador.push("Es necesario el tipo de equipo");
    };

    return validador;


};

module.exports={
    validadorInventario,
}