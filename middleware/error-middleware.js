import ApiError from '../excepctions/api-erros.js';

export default function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json(
            {
                error: err.message,
            }
            )
    }
    return res.status(500).json(
        {
            error: 'Непредвиденная ошибка'
        }
        )
}
