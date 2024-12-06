import ApiError from '../excepctions/api-erros.js';

export default function (req, res, next) {
    try {
        const filters = JSON.parse(req.query.filters);
        if (!filters) {
            return next(ApiError.BadRequest("Нет фильтров"));
        }

        req.filters= filters;
        next()
    } catch (e) {
        return next(ApiError.BadRequest("Ошибка фильтрации"));
    }
};
