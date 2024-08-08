import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    // Hash Password
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
    
}

export const checkPassword = async( enterPassword: string, statedHash: string) => {
    return await bcrypt.compare(enterPassword, statedHash)
}