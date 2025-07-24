import { Client } from "pg"
import { ServiceUnavailableError } from "./erros.js";

async function query(queryObject){
    let client;

    try {
        client = await getNewClient();
        await client.connect();
        const result = await client.query(queryObject);
        return result;   
    } catch (error) {
        const MethodNotAllowed = new ServiceUnavailableError({ 
            message: "Erro ao conectar com o banco de dados",
            cause: error, 
        });
        throw MethodNotAllowed;
    }finally{
        await client?.end();
    }
}

async function getNewClient() {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user:process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD
    });

    return client;
}

export default {
    query: query,
}