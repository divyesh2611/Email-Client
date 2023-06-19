const {Sequelize} = require('sequelize')
const ROOT_PATH = __dirname;
const {Umzug, SequelizeStorage} = require('umzug')

    const sequelize = new Sequelize({
    database : "kafka",
    username : "divyesh",
    password : "divyesh",    
    host: "127.0.0.1",
    dialect: "postgres",
    port:26257,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }
    }

    });
        
        const umzug = new Umzug({
            migrations: { glob: "kafka/*.js"},
            context: sequelize.getQueryInterface(),
            storage: new SequelizeStorage({sequelize}),
            logger: console,
        });

        (async () => await umzug.up())();
