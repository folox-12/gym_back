import ApiError from '../excepctions/api-erros.js';
import tokenService from '../service/tokenService.js';

export default function (req, res, next) {
    try {
        const { isActivated } = req.user.user;

        if(!isActivated) {
            return next(ApiError.BadRequest('Аккаунт не активирован'));
        }
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError(e.message));
    }
};
