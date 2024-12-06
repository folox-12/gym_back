import jsonwebtoken from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()
import ApiError from '../excepctions/api-erros.js';

class TokenService {
    generateAccessToken(payload) {
        const user = {
            user: {
                ...payload
            }
        }
        return jsonwebtoken.sign(
            user,
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: "30m" }
        )
    }

    validateAccessToken(token) {
            try {
                const userData = jsonwebtoken.verify(token, process.env.JWT_ACCESS_SECRET);
                return userData;
            } catch (err) {
                throw new ApiError('400', err.name);
            }
    }
}
export default new TokenService;
