const {Sequelize} = require('sequelize')
const ROOT_PATH = __dirname;
const {Umzug, SequelizeStorage} = require('umzug')

    const sequelize = new Sequelize("test1", "root", "root", {
    host: "127.0.0.1",
    dialect: "mysql",
    });
        
        const umzug = new Umzug({
            migrations: { glob: "sql/*.js"},
            context: sequelize.getQueryInterface(),
            storage: new SequelizeStorage({sequelize}),
            logger: console,
        });

        (async () => await umzug.up())();
