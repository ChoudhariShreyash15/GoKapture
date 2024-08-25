import bcrypt from 'bcryptjs'
import crypto from "crypto"

const key = Buffer.from(process.env.ENCRYPTION_SECRET, "hex")
const iv = Buffer.from(process.env.IV, "hex")

export const hashPassword = async (password) => {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    return bcrypt.hash(password, salt)
}

export const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const encryptData = (text) => {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    let encrypted = cipher.update(text, "utf8", "hex")
    encrypted += cipher.final("hex")
    return encrypted
}

export const decryptData = (encryptedText) => {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)
    let decrypted = decipher.update(encryptedText, "hex", "utf8")
    decrypted += decipher.final("utf8")
    return decrypted
}