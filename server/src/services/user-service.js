const UserModel = require("../db/models/user-model");
const bcrypt = require("bcrypt");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
    async registration(email, password, name) {
        const candidate = await UserModel.findOne({ email });

        if (candidate)
            throw ApiError.BadRequest(
                `Користувач з електронною адресою ${email} вже зареєстрований на сайті!`
            );

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            email,
            name,
            password: hashPassword,
        });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto });

        await tokenService.saveToken(
            userDto.id,
            tokens.refreshToken,
            tokens.accessToken
        );
        return {...tokens, user: userDto };
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });

        if (!user)
            throw ApiError.BadRequest(
                "Користувача з такою електронною адресою не знайдено!"
            );

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) throw ApiError.BadRequest("Невірний пароль");

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto });
        await tokenService.saveToken(
            userDto.id,
            tokens.refreshToken,
            tokens.accessToken
        );
        return {...tokens, user: userDto };
    }

    async logout(accessToken) {
        return await tokenService.removeToken(accessToken);
    }

    async userUpdate(req) {
        const user = await UserModel.findById(req.user.id);

        if (!user) throw ApiError.BadRequest(`User not found!!!`);

        const updates = ["email", "name"];
        updates.forEach((property) => {
            if (req.body[property]) user[property] = req.body[property];
        });

        if (req.body.password)
            user["password"] = await bcrypt.hash(req.body.password, 10);

        await user.save();
        return user;
    }

    async getUser(req) {
        const user = await UserModel.findOne({ _id: req.user.id }, { balance: 1, email: 1, name: 1, rating: 1 });

        return {
            name: user.name,
            email: user.email,
            rating: user.rating,
            balance: user.balance,
            investPortfolioCost: await Statisctics.beforeinvPortfolioCost(
                req.user.id
            ),
        };
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto };
    }


    async delete(id) {
        const user = await UserModel.findOne({ _id: id });

        if (user) {
            await UserModel.deleteOne({ _id: id });
            return {
                msg: "Користувача видалено",
                status: true,
            };
        }

        return {
            msg: "Такий користувач не зареєстрований в системі",
            status: false,
        };
    }




}

module.exports = new UserService();