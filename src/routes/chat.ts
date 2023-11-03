import express from 'express';
import { addMessage, getMessages, initiateChat } from '../controller/chatController';
const chatRouter = express.Router();

chatRouter.route("/create").post(initiateChat);
chatRouter.route("/add").post(addMessage);
chatRouter.route("/get/:id").get(getMessages);




export default chatRouter;
