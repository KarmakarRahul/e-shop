const jwt = require('jsonwebtoken')

class TokenService {
    getJwtToken(data) {
        const jwtData = {
            email: data.email,
            name: data.name,
        }
        const token = jwt.sign(jwtData, process.env.JWT_SECRET)
        return token
    }
    verifyJwtToken(token) {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        return data
    }
}
module.exports = new TokenService()
