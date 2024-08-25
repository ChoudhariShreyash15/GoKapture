import express from "express";
import cors from "cors";
import "dotenv/config";
import ip from "ip";
import { responseGenerator } from "./helpers/response.js";
import { StatusCodes } from 'http-status-codes'
import logger from './helpers/logger.js'
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";

const port = process.env.SERVER_PORT || 3000;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use('/user', userRouter);
app.use('/task', taskRouter);

app.get("/", (req, res) => {
    res.send(
        responseGenerator({ massage: "UP" }, StatusCodes.OK, "SUCCESS")
    );
});

app.listen(port, () => {
    logger.info(`server is running on: ${ip.address()}:${port}`);
});
