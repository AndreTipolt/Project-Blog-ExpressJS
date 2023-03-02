import { AppDataSource } from "../data-source";
import { Post } from "../models/Post";

export const postRepository = AppDataSource.getRepository(Post)