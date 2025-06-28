const { verify } = require("../utils/jwt.util");

module.exports.verifyLogin = async (req, res, next) => {
    try{
        const jwToken = req.cookies['jw_token'];

        if(!jwToken) return res.status(401).json({error: "Unauthorized"});

        const {data} = await verify(jwToken);

        req.user = data;
        next();
    } catch(err){
        console.log(err);
    }
}