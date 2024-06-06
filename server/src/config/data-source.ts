import { ENTITIES } from "../common/entities/entities";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';
config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [...ENTITIES],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: false,
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource