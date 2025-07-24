import crypto from "node:crypto";
import database from "infra/database.js"
import { ConflictError } from "infra/erros.js";

const EXPIRATION_IN_MILLISECONDS = 1000 * 60 * 60 * 24; // 1 dia

const TOKEN_DEMO = 'demo-token';

async function create(userId) {

    const token = crypto.randomBytes(16).toString("hex");
    const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

    //const newSession = await runInsertQuery(token, userId, expiresAt);
    const newSession = demoSession();
    return newSession;

    async function demoSession() {
        const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);
        return {
            id: 1,
            token: TOKEN_DEMO,
            user_id: 1,
            expires_at: expiresAt.toISOString()
        };
    }

    async function runInsertQuery(token, userId, expiresAt) {

        const results = await database.query({
            text: `
            INSERT INTO 
                sessions (token, user_id, expires_at)
            VALUES
                ($1, $2, $3)
            RETURNING
                *
            ;
            `,
            values: [token, userId, expiresAt]
        });

        return results.rows[0];
        
    }
}



const session = {
    create,
    EXPIRATION_IN_MILLISECONDS
};

export default session;