const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mailService');
const tokenService = require('../service/tokenService');
const UserDto = require('../dtos/userDto');

class UserService {

    async registration(email, password) {
        const candidate = await UserModel.findOne({email});
        if (candidate) {
            throw new Error(`Пользователь с адресом ${email} уже существует`);

        }
        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink = uuid.v4();
        const user = await UserModel.create({email, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService();
