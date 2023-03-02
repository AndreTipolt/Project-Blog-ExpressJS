import 'dotenv/config'
import 'reflect-metadata'

import { DataSource } from "typeorm"

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
    type: 'mysql',
    port,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/**/models/*.{ts, js}`], // Onde estao as entidades // (**) significa todas as pastas // (*) significa todas que contenham a extensao .ts e .js
    migrations: [`${__dirname}/**/migrations/*.{ts, js}`] 
})