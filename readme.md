# Lee-startkit

一个神奇的脚手架！:smile_cat:

__FBI-WARNING__：建议对[PM2][1]有一定了解或者愿意尝试去接触一下。:crossed_fingers:

适用于`Typescript`、`Koa`技术栈，且整合了一个神奇的ORM框架`Typeorm`。

使用超级强大的`PM2`部署开发环境和生产环境，并实现了__热更新__，LOL，再也不用重启啦~

通过超级强大的`PM2`，只有你想不到的，没有它做不到的事，能玩出什么花样，全看你啦。

这里还有一个神奇的地方，那就是__DEBUG__啦，哈哈哈。、

## 特性

- [x] 实现热更新
- [x] 实现DEBUG
- [x] 整合`Typescript`环境
- [x] 整合`PM2`
- [x] 整合[Typeorm][2]
- [x] 整合koa, koa-router, [koa-body][3]
- [x] 整合[roa-router][4]
- [ ] 整合koa-static
- [ ] 整合koa-ejs
- [ ] 整合koa-logger
- [ ] 实现generator，命令行生成脚手架，美滋滋

## 使用

### 安装

您懂得，先`git clone`一下。

再然后，您懂得，`npm i`一下。

### 启动开发环境

```shell
npm run dev
```

### 开启DEBUG

1. 找到项目根目录下的`pm2-app-0.pid`文件，查看进程号。

2. 打开`.vscode`目录下的`lanuch.json`文件。

3. 添加一个`*configurations*`

   ```json
           {
               "type": "node",
               "request": "attach",         // vsCode的attach模式
               "name": "attach",            // ...whatever
               "skipFiles": [
                   "<node_internals>/**"
               ],
               "processId": "12232"       // ..这里输入上面提到的进程号
           }
   ```

4. 神奇的地方来了，直接按`F5`。

### 启动生产环境

```
npm run prod
```

## 配置文件

- ecosystem.config.js
- ormconfig.json
- tsconfig.json



