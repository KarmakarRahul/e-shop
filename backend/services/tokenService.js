const jwt = require("jsonwebtoken");

class TokenService {
    async getJwtToken(data){
        const token  = jwt.sign(data,process.env.JWT_SECRET);
        return token;
    }
    async verifyJwtToken(token) {
        const data =  jwt.verify(token,process.env.JWT_SECRET);
    }
}