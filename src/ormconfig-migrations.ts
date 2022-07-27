import { DataSource } from 'typeorm';

const configMigration = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1q2w3e4r%T',
    database: 'medium',
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*.{js,ts}']
});

export default configMigration;