import express from "express";
import { userRouter } from "@modules/users/4-frameworks-and-drivers/http/routes";

export const v1Router = express.Router();

v1Router.use("/users", userRouter);
