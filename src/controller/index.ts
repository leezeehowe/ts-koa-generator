import * as http from "http";
import Config from '../config';
import * as Application  from "koa";
import "colors";

const DEFAULT_PORT = 3000;
const app = new Application();
const server = http.createServer(app.callback());

const log = console.log.bind(console, `>>> [Controller-koa2] - ${new Date().toTimeString()}`.blue);



/**
 * server 监听成功成功回调
 * @param app 
 */
const handleOnListening = () => {
    log(`控制层启动成功！监听端口：${Config.server.port || 3000}`);
}

/**
 * server 监听端口失败回调
 * @param error 
 */
// const handleOnError = (error: { name: any; message: any; stack: any; }) => {
//     log(`控制层启动失败！ error: ${error.name} - ${error.message}`.red);
//     if (Config.process.stopIfDaoInitFailed) {
//         process.exit(1);
//     }
// }


export const initController = async (): Promise<Application> => {
    server.listen(Config.server.port || DEFAULT_PORT);
    server.on("listening", handleOnListening);
    // server.on("error", handleOnError);
    return app;
}