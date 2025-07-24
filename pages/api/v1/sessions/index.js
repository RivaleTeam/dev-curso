import {createRouter} from "next-connect";
import * as cookie from "cookie";
import controller from "infra/controller.js";
import user from "models/user.js";
import session from "models/session.js";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.ErrorHandler);

async function postHandler(request, response){

    const email = 'demo@demo.com';
    const password = '123456';

    const userBody = request.body;

    try {
        if (userBody.email !== email || userBody.password !== password) {
            throw new UnauthorizedError({
                message: "Email ou senha inválidos"
            });
        }
    } catch (error) {
        throw new UnauthorizedError({
             message: "Email ou senha inválidos"
        });
    }
   
    const newSession = await session.create(1);

    const setCookie = cookie.serialize("session", newSession.token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: newSession.EXPIRATION_IN_MILLISECONDS / 1000,
    });

    response .setHeader("Set-Cookie", setCookie);

    response.status(201).json({})     
}