import ApiError from '../excepctions/api-erros.js'
import tokenService from '../service/tokenService.js'

export default function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization

        if (authorizationHeader) {
            const accessToken = authorizationHeader.split(' ')[1]
            if (accessToken) {
                const userData = tokenService.validateAccessToken(accessToken)

                if (userData) {
                    req.userId = userData.user.id
                    next()
                } else {
                    next();
                }
            } else {
                next()
            }
        } else {
            next()
        }
    } catch (e) {
        return next()
    }
}
