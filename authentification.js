const jwt=require('jsonwebtoken')
function verifyisAdmin(req, res, next) {
    const token = req.headers.token
    if (token) {
        const decoded = jwt.verify(token, 'seceti')
        req.isAdmin = decoded.isAdmin
        next()
    }
    else {
        res.status(401).json({message:'no autorise'})
    }
}
module.exports=verifyisAdmin