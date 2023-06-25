const mongoose = require('mongoose')
const author = mongoose.model('Author', {
    name: {
        type: String,
        unique:true,
        required:true
    },
    mobile: {
        type:String
    }
})
module.exports=author