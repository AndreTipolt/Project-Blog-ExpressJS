import { AppDataSource } from "../data-source";
import { User } from "../models/User";

export const userReposity = AppDataSource.getRepository(User)