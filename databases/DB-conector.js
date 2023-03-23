const mongo = require('mongoose');

const getConnection = async() => {

    try{
        const url = 'mongodb+srv://johnvallejo:cocnetar01@cluster0.wshp57x.mongodb.net/?retryWrites=true&w=majority';

        await mongo.connect(url);
        console.log('Conexion Exitosa');

    }catch (error){
        console.log('Error');
    }

}

module.exports={
    getConnection,
}