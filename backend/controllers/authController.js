const UserDto = require('../Dtos/userDto.js');
const HashService = require('../services/hashService.js');
const UserService = require('../services/userService.js');
class AuthController {
    async signUp(req, res) {
        const { email, name, password } = req.body;

        // check by email whether the user with this email exist or not
        if (await UserService.isUserExists({ email: email }) === true) {
            return res.status(409).json({
                "message": "User already exist."
            })
        }
        // hash the password using bcrypt
        const hashedPashword = await HashService.hashPassword(password);

        try {
            const user = await UserService.createUser(
                {
                    name,
                    email,
                    password : hashedPashword
                }
            )
            return res.json(new UserDto(user));
            // transform the user from user DTO

        } catch (error) {
            console.log("authcontroller->signUp");
            console.log(error);
            return res.status(501).json(
                {
                    message: "Internal server ",
                    error: "Failed to create user."
                }
            )
        }
    }
}
module.exports = new AuthController();