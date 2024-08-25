import database from '../config/mysql.config.js'
import logger from '../helpers/logger.js'
import QUERY from '../queries/user.query.js'
import { comparePassword, decryptData, hashPassword } from '../helpers/index.js'
import { getJwt, verifyJwt } from '../helpers/jwt.js'
import { responseGenerator } from '../helpers/response.js'
import { StatusCodes } from 'http-status-codes'

export const verifyUser = async (req, res, next) => {
    try {
        const { token } = req.headers["authorization"];
        const decryptToken = decryptData(token);
        const tokenData = await verifyJwt(decryptToken);

        database.query(QUERY.SELECT_USER, [username], (error, results) => {
            if (!results) {
                logger.error(error.message);
                res.status(StatusCodes.BAD_REQUEST)
                    .send(
                        responseGenerator(
                            { error },
                            StatusCodes.BAD_REQUEST,
                            `Database error...`
                        ));
            } else {
                logger.info("=====================================================================");
                logger.info(`Error in search_user: ${error}`);

                logger.info(`Results in search_user: ${JSON.stringify(results, null, 2)}`);

                logger.info("=====================================================================");
                logger.info("User found");
                // const user = results[0]

                next();
            }
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(
                responseGenerator(
                    { error },
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    `Error occurred`
                ));
    }
}