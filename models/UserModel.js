import db from '../dbconnection.js'

const sequelize = db
const UserModel = sequelize.define(
    'user',
    {
        name: {
            type: String,
            required: false,
        },
        surname: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        is_activated: {
            type: Boolean,
            default: 0,
        },

        activation_link: { type: String },
    },
    {
        defaultScope: {
            attributes: {
                exclude: ['activation_link', 'password'],
            },
        },
        scopes: {
            withoutUserInformation: {
                attributes: {
                    exclude: [
                        'id',
                        'name',
                        'surname',
                        'email',
                        'password',
                        'is_activated',
                        'activation_link',
                    ],
                },
            },
            showAuthorInformation: {
                attributes: {
                    exclude: [
                        'id',
                        'password',
                        'is_activated',
                        'activation_link',
                    ],
                },
            },
            loginScope: {},
        },
    }
)

export default sequelize.model('user')
