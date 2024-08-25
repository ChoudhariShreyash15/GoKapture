import pkg from "jsonwebtoken"
import logger from '../helpers/logger.js'

const { sign, verify } = pkg

export function getJwt(data, options = {}) {
    try {
        return sign(data, process.env.JWT_SECRET_KEY, options)
    } catch (error) {
        logger.info("Error while generating JWT", error)
    }
}

export async function verifyJwt(authorization) {
    try {
        const token = await verify(authorization, process.env.JWT_SECRET_KEY)
        return token
    } catch (error) {
        logger.info("Error while verifying JWT", error)
    }
}