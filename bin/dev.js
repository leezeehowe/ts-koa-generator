require("colors");
const path = require("path");
const fs = require("fs");
const pm2 = require("pm2");
const { exec } = require("child_process");
const { watch } = require("chokidar");
const pm2_config = require("../ecosystem.config");

// 项目根目录
const rootPath = path.join(__dirname, "../");
// src目录
const srcPath = path.join(__dirname, "../src");
// app目录
const appPath = path.join(__dirname, "../app");
// 文件监听器
const watcher = watch(srcPath);

// 日志打印
const dev_log = console.log.bind(console, ">>> [DEV]".blue);
const dev_group = console.group.bind(console, ">>> [DEV]".blue);
const dev_groupEnd = console.groupEnd.bind(console);

// 编译命令，这里使用Typescript官方的编译器，不带参数将使用项目根目录下tscconfig.json配置文件
const COMPILE_CMD = "tsc";

/**
 * 修改文件后缀名
 * @param {string} source 源文件名
 * @param {string} target_suffix_without_poin 文件类型
 */
function changeSuffix(source, target_suffix_without_point) {
    const index = source.lastIndexOf(".");
    return source.slice(0, index) + "." + target_suffix_without_point;
}

/**
 * 编译工作目录
 */
const compile = async () => {
    return new Promise((resolve, reject) => {
        dev_group("重编译工作目录中...");
        exec(COMPILE_CMD, (error, stdout, stderr) => {
            if (error || stderr) {
                dev_log(`重编译失败\n${error}\n${stdout}\n${stderr}`.red);
                dev_groupEnd()
                return reject(error || stderr);
            }
            dev_log("重编译成功".green);
            dev_groupEnd()
            return resolve(stdout);
        })
    })
}

/**
 * 使用PM2启动APP
 */
const startAppUsingPM2 = async (__pm2_config) => {
    dev_group("使用PM2运行APP中...");
    return new Promise((resolve, reject) => {
        pm2.start(__pm2_config, (err) => {
            if (err) {
                dev_log(`运行失败，${err.name} ${err.message}`.red);
                dev_groupEnd();
                return reject(err);
            }
            else {
                dev_log("运行成功，查看项目日志请另开控制台，使用PM2命令查看...".green);
                dev_log("FBI-WARNING:".yellow + "退出时，请务必 Ctrl + C 结束该进程，否则使用PM2运行的APP仍然会在后台运行...");
                dev_groupEnd();
                return resolve();
            }
        })
    })
}

/**
 * 处理文件添加事件
 * ：重编译工作目录
 * @param {string} absPath 添加的文件的绝对路径 
 * @param {*} status 
 */
const handleAddEvent = (absPath, status) => {
    dev_group("监听到文件添加:", absPath);
    compile()
        .then(res => {
            // ...
        })
        .catch(err => {
            // ...
        })
        .finally(() => {
            dev_groupEnd();
        })
}

/**
 * 处理文件修改事件
 * @param {string} absPath 修改的文件的绝对路径 
 * @param {*} status 
 */
const handleChangeEvent = (absPath, status) => {
    dev_group("监听到文件修改:", absPath);
    const relative_path = path.relative(rootPath, absPath).toString();
    compile()
        .then(res => {
            //...
        })
        .catch(err => {
            //...
        })
        .finally(() => {
            dev_groupEnd();
        })
}

/**
 * 处理文件删除事件
 * ：删掉对应的app目录下的文件
 * @param {string} absPath src目录下被删除的文件的绝对路径 
 * @param {*} status 被删文件的状态
 */
const handleUnlinkEvent = (absPath, status) => {

    const promiseUnlink = (_path) => {
        return new Promise((resolve, reject) => {
            fs.unlink(_path, (err) => {
                if (err) {
                    return resolve({
                        success: false,
                        _path,
                        err
                    });
                }
                else {
                    return resolve({
                        success: true,
                        _path
                    });
                }
            })
        })
    }

    dev_group("监听到文件删除:", absPath);
    dev_log("删除app目录对应文件中...");
    // 被删文件相对srcDir的路径
    let relative_path = path.relative(srcPath, absPath);
    // 被删文件到appDir的绝对路径
    let abs_path_to_appDir = path.resolve(appPath, relative_path).toString();
    abs_path_to_appDir = changeSuffix(abs_path_to_appDir, "js");
    Promise.all(Array.of(promiseUnlink(abs_path_to_appDir), promiseUnlink(abs_path_to_appDir + ".map")))
        .then(res => {
            res.forEach(v => {
                const success = v.success;
                const _path = v._path;
                const err = v.err;
                if (success) {
                    dev_log(`删除 ${_path.underline} 成功`.green);
                } else {
                    dev_log(`删除 ${_path.underline} 失败，请手动删除！`.red);
                }
            });
            dev_groupEnd();
        })
}

/**
 * 初始化文件监听器
 */
const initWatcher = async () => {
    return new Promise((resolve, reject) => {
        try {
            watcher.on("ready", () => {
                dev_group("开始监听工作目录:", srcPath);
                dev_log("FBI-WARNING:".yellow + " 建议关闭IDE的自动保存功能，否则热更新太频繁了...");
                watcher
                    .on('add', handleAddEvent)
                    .on('change', handleChangeEvent)
                    .on('unlink', handleUnlinkEvent);
                dev_groupEnd();
                resolve();
            })
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 删除使用PM2运行的APP
 */
const deletePm2Process = async () => {
    return new Promise((resolve, reject) => {
        pm2.delete("all", err => {
            if (err && err.message !== "process name not found") {
                reject(err);
            }
            else {
                resolve();
            }
        });
    })
}

/**
 * 关闭chokidar的文件监听器
 */
const closeWatcher = async () => {
    return watcher.close()
}

/**
 * 处理用户结束进程事件
 * 
 * @param {*} code 
 */
const handleProcessExit = async (code) => {
    dev_group("正在退出程序，但是还需要执行一些步骤...");

    try {
        dev_group("正在删除PM2中运行的APP");
        await deletePm2Process();
        dev_log(`删除 PM2 APP 成功!`.green);
    } catch (err) {
        dev_log(`删除 PM2 APP 失败！${err.name} - ${err.message}`.red);
        dev_log(`请手动删除 PM2 APP ！`.red.bold);
        dev_log(`FBI-WARNING: 请务必删除 PM2 APP，否则当重编译工作目录后，PM2不会重启APP，原因不明...`.underline.red);
    } finally {
        dev_groupEnd();
    }

    try {
        dev_group("正在关闭文件监听器");
        closeWatcher();
        dev_log("关闭成功！".green);
    } catch (error) {
        dev_log("关闭失败！".red);
    } finally {
        dev_groupEnd();
    }
    dev_log("已安全退出！".green);
    dev_groupEnd();
    console.log("Bye. \u26A1");
    console.log("下版本将添加新特性：增量重编译");
    process.exit(0);
}

/**
 * 入口方法
 */
const main = async () => {
    console.log("\nLee-starkit".underline.brightGreen.bold + " Project Dev env \u2708".green);
    try {
        await initWatcher();
        await compile();
        await startAppUsingPM2(pm2_config);
        process.on("SIGINT", handleProcessExit);
    } catch (error) {
        process.exit(1);
    }
}

main();