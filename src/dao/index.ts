import "reflect-metadata";
import { createConnection, getConnectionOptions, Connection, ConnectionOptions } from "typeorm";
import Config from "../config";
import "colors";

const log = console.log.bind(console, `>>> [Dao-Typeorm] - ${new Date().toTimeString()} `.blue);

/**clear
 * 返回自定义数据库连接配置`
 */
const getCustomOptions = (): object => {
    // add some extra options here ....
    return {};
}

/**
 * 连接数据库
 * @param customOptions 自定义配置
 */
const connect = async (customOptions: object): Promise<{ connection: Connection, db_options: ConnectionOptions }> => {
    let options = await getConnectionOptions();
    Object.assign(options, customOptions);
    return {
        connection: await createConnection(options),
        db_options: options
    };
}

export const initDAO = async () => {
    return new Promise((resolve, reject) => {
        connect(getCustomOptions())
            .then(res => {
                log("建立数据库连接成功！");
                resolve(res);
            })
            .catch(err => {
                log(`建立数据库连接失败！`.red);
                reject(err);
                // if(Config.process.stopIfDaoInitFailed) {
                //     process.exit(1);
                // }
            })
    })
}