import jwt from 'jsonwebtoken'

export const generateJWT = () => {
    const data = {
        name: 'Everth',
        credit_card: '12435456675674',
        password: 'password'
    }
    const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '1m'
    })
    return token
}