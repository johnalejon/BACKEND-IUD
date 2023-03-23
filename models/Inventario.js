const {Schema, model} = require('mongoose');



const InventarioSchema = Schema({

    serial:{
        type:String,
        required: true,
        unique: true
    },
    model:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
         ref: 'Usuario',
         required: false
    },
    brand:{
        type: Schema.Types.ObjectId,
        ref: 'MarcaEquipo',
        required: true
    },
    equipmentStatus:{
        type: Schema.Types.ObjectId,
        ref: 'EstadoEquipo',
        required: true
    },
    equipmentType:{
        type: Schema.Types.ObjectId,
        ref:'TipoEquipo',
        required:true
    },
    creationDate:{
        type:Date,
        required:true
    },
    updateDate:{
        type:Date,
        required:true
    }
});


module.exports = model('Inventario',InventarioSchema);