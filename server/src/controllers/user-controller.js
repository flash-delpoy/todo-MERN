const userService = require("../services/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const jwt = require("jsonwebtoken");


const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "24h",
    });
};

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty())
                return next(
                    ApiError.BadRequest("Помилка валідації даних", errors.array())
                );

            const { email, password, name } = req.body;
            const userData = await userService.registration(email, password, name);
            res.cookie("Token", userData.refreshToken, {
                maxAge: 30 * 60 * 60 * 24,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie("Token", userData.refreshToken, {
                maxAge: 30 * 60 * 60 * 24,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { Token } = req.cookies;
            const token = await userService.logout(Token);
            res.clearCookie("Token");
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const user = await userService.userUpdate(req);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role);
            return res.json({ token });
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { Token } = req.cookies;
            const userData = await userService.refresh(Token);
            res.cookie("Token", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            return res.json(await userService.delete(req.params.id));
        } catch (e) {
            next(e);
        }
    }

    async getUser(req, res, next) {
        try {
            const bonds = await userService.getUser(req);

            return res.json(bonds);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();