import express from "express";
import {
  getMessages,
  getUsersForSidebar,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/messageController.js";
import { protectRoute } from "../middleware/auth.js";

const messageController = express.Router();

messageController.get("/users", protectRoute, getUsersForSidebar);
messageController.get("/:id", protectRoute, getMessages);
messageController.put("/mark/:id", protectRoute, markMessageAsSeen);
messageController.post("/send/:id", protectRoute, sendMessage);

export default messageController;
