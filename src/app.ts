import * as Application  from "koa";
import * as koaBody from "koa-body";
import { initDAO } from "./dao";
import { initController } from "./controller";
import { UserController } from "./controller/UserController";

let app: Application;

const boot = async () => {
    app = await initController();
    await initDAO();
    app.use(koaBody());
    app.use(UserController["router"].routes());
}

boot().then(res => {

}).catch(err => {
    throw err;
})