import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1q2w3e4r%T',
    database: 'medium',
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    synchronize: true
}

export default config;