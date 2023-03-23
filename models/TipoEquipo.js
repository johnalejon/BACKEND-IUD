const {Schema, model}= require('mongoose');


const TipoEquipoSchema = Schema({
    name:{
        type: String,
        require: true
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


module.exports = model('TipoEquipo',TipoEquipoSchema);