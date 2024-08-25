import { nanoid } from "nanoid";
import database from '../config/mysql.config.js'
import QUERY from "../queries/task.query.js";
import { StatusCodes } from "http-status-codes";
import logger from '../helpers/logger.js'
import { responseGenerator } from "../helpers/response.js";

/// CREATE TASK
/// type        -- POST
/// endpoint    -- /task
export const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, due_date } = req.body;
        // const { id: userId, username } = req.user;
        const taskId = nanoid();

        logger.info("creating task...")
        database.query(QUERY.CREATE_TASK, [taskId, title, description, status, priority, due_date], (error, results) => {
            if (!results) {
                logger.error(`error while creating task: ${error}`);
                res.status(StatusCodes.BAD_GATEWAY)
                    .send(
                        responseGenerator(
                            { error },
                            StatusCodes.BAD_GATEWAY,
                            `Error occurred`
                        ));
            } else {
                logger.info(`task created successfully!`);
                const task = results[0];
                logger.info(`task: ${task}`);

                res.status(StatusCodes.CREATED)
                    .send(
                        responseGenerator(
                            { task },
                            StatusCodes.CREATED,
                            `Task created for ${username}`
                        ));
            }
        })
    } catch (error) {
        logger.error(error.message);
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(
                responseGenerator(
                    { error },
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    `Error occurred`
                )
            );
    }
};
