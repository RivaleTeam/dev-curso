import {createRouter} from "next-connect";
import controller from "infra/controller.js";
import user from "models/user";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.ErrorHandler);

async function getHandler(request, response){

    const username = request.query.username;

    
    response.status(200).json({
        api:'bla bla bla',
        update_at: new Date().toISOString(),
        user: {
            username: username,
        }
    })     
}