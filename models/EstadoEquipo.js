const {Schema, model} = require('mongoose');


const EstadoEquipoSchema = Schema({
    name:{
        type: String,
        require: true,
        unique: true
    },
    state:{
        type:String,
        required:true,
        enum:[
            'Active',
            'Inactive'
        ]

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

module.exports = model('EstadoEquipo',EstadoEquipoSchema);