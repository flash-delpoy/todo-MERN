const todoService = require("../services/todo-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class TodoController {
    async getTodo(req, res, next) {
        try {
            // return res.json(await todoService.getTodo(req.user.id));
            return res.json(await todoService.getTodo());
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty())
                return next(
                    ApiError.BadRequest("Помилка валідації даних", errors.array())
                );

            const { title, done } = req.body;
            // const todoData = await todoService.create(title, done, req.user.id);
            const todoData = await todoService.create(title, done);

            return res.json(todoData);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const user = await todoService.update(req);
            return res.json(user);
        } catch (e) {
            next(e.message);
        }
    }

    async delete(req, res, next) {
        try {
            return res.json(await todoService.delete(req.params.id));
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

module.exports = new TodoController();