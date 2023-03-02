import { AppDataSource } from "../data-source";
import { Comment } from "../models/Comment";

export const commentRepository = AppDataSource.getRepository(Comment)