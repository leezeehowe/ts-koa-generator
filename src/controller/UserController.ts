const { Controller, Get, Post } = require("roa-restful");
import { Context } from "koa";


@Controller("/user")
export class UserController {

    @Get("")
    async userInfo(ctx: Context, next: any) {
        ctx.response.body = {
            name: "lee",
            age: 221
        }
    }

    @Post()
    async postUser(ctx: Context, next: any) {
        let body = ctx.request.body;
        ctx.response.body = body;
    }

}
