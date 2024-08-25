import database from '../config/mysql.config.js'
import logger from '../helpers/logger.js'
import QUERY from '../queries/user.query.js'
import { responseGenerator } from '../helpers/response.js'
import { StatusCodes } from 'http-status-codes'
import { nanoid } from 'nanoid'
import { comparePassword, encryptData, hashPassword } from '../helpers/index.js'
import { getJwt } from '../helpers/jwt.js'

/// CREATE USER
/// type        -- POST
/// endpoint    -- /user
export const createUser = async (req, res) => {
    const { username, password } = req.body;
    const id = nanoid();
    const hashedPassword = await hashPassword(password);

    logger.info(`${req.method} ${req.originalUrl}, creating user`);
    database.query(QUERY.CREATE_USER, [id, username, hashedPassword], (error, results) => {
        if (!results) {
            logger.error(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(
                    responseGenerator(
                        { error },
                        StatusCodes.INTERNAL_SERVER_ERROR,
                        `Error occurred`
                    ));
        } else {
            logger.info("=====================================================================");
            logger.info(`Error in create_user: ${error}`);

            // Log the results
            logger.info(`Results in the same: ${JSON.stringify(results, null, 2)}`);

            logger.info("=====================================================================");
            logger.info("User created successfully!");

            res.status(StatusCodes.CREATED)
                .send(
                    responseGenerator(
                        {},
                        StatusCodes.CREATED,
                        `User created`
                    ));
        }
    })
}

/// LOGIN USER
/// type        -- GET
/// endpoint    -- /user
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    logger.info(`${req.method} ${req.originalUrl}, validating user`);
    database.query(QUERY.SELECT_USER, [username], async (error, results) => {
        if (!results) {
            logger.error(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(
                    responseGenerator(
                        {},
                        StatusCodes.INTERNAL_SERVER_ERROR,
                        `Error occurred`
                    ));
        } else {
            // logger.info("user logged in successully!");
            logger.info(`Results in login: ${JSON.stringify(results, null, 2)}`);
            const user = results[0];
            // console.log(user);

            const doesPasswordMatch = await comparePassword(password, user.password);

            if (doesPasswordMatch) {
                const token = await getJwt({ id: user.id, username: user.username });

                const encryptedToken = encryptData(token);
                res.status(StatusCodes.OK)
                    .send(
                        responseGenerator(
                            { ...user, token: encryptedToken },
                            StatusCodes.OK,
                            `User logged in successully!`
                        ));
            } else {
                res.status(StatusCodes.UNAUTHORIZED)
                    .send(
                        responseGenerator(
                            {},
                            StatusCodes.UNAUTHORIZED,
                            `Wrong password, try again!`
                        ));
            }
        }
    })
}