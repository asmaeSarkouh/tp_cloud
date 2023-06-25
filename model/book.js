const mongoose = require('mongoose')
const book = mongoose.model('Book', {
    title: {
        type: String,
        lowercase:true,
        required:true
    },
    suivants: {
        type: String,
        unique:true,
    },
    subject: {
        type: String,
        enum:['programming','design','network']
    },
    author: {
        type:String
    },
    price: {
        type:Number
    }
})
module.exports=book