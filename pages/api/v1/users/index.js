import {createRouter} from "next-connect";
import controller from "infra/controller.js";
import user from "models/user.js";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.ErrorHandler);

async function postHandler(request, response){

    const userBody = request.body;

    const users = await user.create(userBody);

    console.log(users);

    response.status(200).json({
        api:'bla bla bla',
        update_at: new Date().toISOString(),
        user: users
    })     
}