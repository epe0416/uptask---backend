import type { Request, Response } from "express"
import User from "../models/User"
import { hashPassword } from "../utils/auth"
import Token from "../models/Token"
import { generateToken } from "../utils/token"
import { transporter } from "../config/nodemailer"

export class AuthController {

    static createAccount = async (req: Request, res: Response) => {
        try {
            const {password, email} = req.body
            // Prevenir usuarios duplicados
            const userExist = await User.findOne({email})
            if(userExist){
                const error = new Error('El usuario ya esta registrado')
                return res.status(409).json({error: error.message})
            }

            // Crea el usuario
            const user = new User(req.body)
            
            // Hash Password
            user.password = await hashPassword(password)

            // Generar Token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            // Enviar Email
            await transporter.sendMail({
                from: 'UpTask <admin@uptask.com>',
                to: user.email,
                subject: 'UpTask - Confirma tu cuenta',
                text: 'UpTask - Confirma tu cuenta',
                html: `<p>Probando e-mail</p>`
            })

            await Promise.allSettled([user.save(), token.save()])

            res.send('Cuenta creada, revisa tu email para confirmar')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
}