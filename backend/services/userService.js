const userModal = require('../models/userModel.js')
class UserService {
    async find(filter) {
        const user = await userModal.findOne(filter);
        return user;
    }
    async createUser(userData) {
        const user = await userModal.create(userData);
        return user;
    }
    async isUserExists(filter) {
        const existingUser = await userModal.findOne(filter);
        return existingUser !== null;
    }
}

module.exports = new UserService();