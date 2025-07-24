import database from "infra/database.js"
import { ConflictError } from "infra/erros.js";

async function create(params) {

     

    const databaseName = process.env.POSTGRES_DB;
    
    const results = await database.query({
        text: `
        SELECT 
            count(*)::int 
        FROM 
            pg_stat_activity 
        WHERE 
            datname = $1
        ;`,
        values: [
            databaseName
        ]

    });
    // RETURNING * 

    return results.rows[0];

    async function validateUniqueEmail(email) {
        const results = await database.query({
            text: `
            SELECT 
                count(*)::int 
            FROM 
                users 
            WHERE 
               LOWER(email) = LOWER($1)
            ;`, 
            values: [email]
        });

        if (results.rowCount > 0) {
            throw new ConflictError({email: "Email já cadastrado"});
        }
    }

    async function runInsertQuery() {
        return await database.query({
            text: `
            INSERT INTO users (
                name, email, password)
            VALUES 
                ($1, $2, $3)
            RETURNING 
                *
            ;
            `,
            values: [params.name, params.email, params.password]
        });
    }
}

const user = {
    create,
};

export default user;