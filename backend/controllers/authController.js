const UserDto = require('../Dtos/userDto.js')
const HashService = require('../services/hashService.js')
const UserService = require('../services/userService.js')
const TokenService = require('../services/tokenService.js')
const hashService = require('../services/hashService.js')
const checkFields = ({ email, name, password }, checkName = false) => {
    const errors = {}

    if (!email || email.trim() === '') {
        errors.email = 'Email is required.'
    }
    if (!password || password.trim() === '') {
        errors.password = 'Password is required.'
    }
    if (checkName === true && (!name || name.trim() === '')) {
        errors.name = 'Name is required.'
    }
    return Object.keys(errors).length === 0 ? null : errors
}
class AuthController {
    async signUp(req, res) {
        const { email, name, password } = req.body
        // OPTIONAL email validation

        const errors = checkFields(req.body, true)
        if (errors) {
            return res.status(400).json({
                errors,
                'optional-message': 'All  fields are mandatory',
            })
        }
        // check by email whether the user with this email exist or not
        if ((await UserService.isUserExists({ email: email })) === true) {
            return res.status(409).json({
                message: 'User already exist.',
            })
        }
        // hash the password using bcrypt
        const hashedPashword = await HashService.hashPassword(password)

        try {
            const user = await UserService.createUser({
                name,
                email,
                password: hashedPashword,
            })
            const token = TokenService.getJwtToken(user)
            return res.json({
                user: new UserDto(user),
                'auth-token': token,
            })
            // transform the user from user DTO
        } catch (error) {
            console.log('authcontroller->signUp')
            console.log(error)
            return res.status(501).json({
                message: 'Internal server error.',
                error: 'Failed to create user.',
            })
        }
    }
    async login(req, res) {
        const { email, password } = req.body
        // OPTIONAL email validation `

        const errors = checkFields(req.body)
        if (errors) {
            return res.status(400).json({
                errors,
                'optional-message': 'All  fields are mandatory',
            })
        }
        // first fetch the user with this  email
        let user = null
        try {
            user = await UserService.find({ email: email })
            if (!user) {
                return res.status(404).json({
                    message:
                        'Wrong email/password, Please login with correct email/password',
                })
            }
        } catch (error) {
            console.log('authcontroller->login')
            console.log(error)
            return res.status(501).json({
                message: 'Internal server error. ',
                error: 'Failed to fetch user.',
            })
        }
        // check password matching
        const isPasswordMatch = await hashService.comparePassword(
            password,
            user.password
        )
        if (!isPasswordMatch) {
            return res.status(404).json({
                message:
                    'Wrong email/password, Please login with correct email/password',
            })
        }
        // generate jwt token
        const token = TokenService.getJwtToken(user)
        res.json({
            user: new UserDto(user),
            'auth-token': token,
        })
    }
}

module.exports = new AuthController()
