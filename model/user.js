const mongoose = require('mongoose')
const user = mongoose.model('User', {
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase:true,
        unique:true
    },
    token: {
        type:String
    },
    isAdmin: {
        type:Boolean,
        defaule:false
    }
})
module.exports=user