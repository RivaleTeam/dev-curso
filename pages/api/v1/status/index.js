import {createRouter} from "next-connect";
import database from "infra/database.js"
import controller from "infra/controller.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.ErrorHandler);

async function getHandler(request, response){

    const resultVersion = await database.query('SHOW server_version');
    const maxConnections = await database.query('SHOW max_connections;');

    const databaseName = process.env.POSTGRES_DB;

    const databaseOpenedConnections = await database.query({
        text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
        values: [databaseName]
    });

    //const databaseOpenedConnections = await database.query("SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'local';");   
    
    const version = resultVersion.rows[0].server_version;
    const maxDb = maxConnections.rows[0].max_connections;
    const databaseOpened = databaseOpenedConnections.rows[0].count;

    
    response.status(200).json({
        api:'bla bla bla',
        update_at: new Date().toISOString(),
        db:{
            version: version,
            max_connections: maxDb,
            open_connection: databaseOpened
        }
    })     
}