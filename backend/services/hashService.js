const bcrypt = require('bcrypt')
class HashService {
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    async comparePassword(password, usersHashedPassword) {
        return await bcrypt.compare(password, usersHashedPassword);
    }
}
module.exports = new HashService();