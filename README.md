# assignment-todo-web-app

本次 assignment 是完成一个 todo Web App, 采用前后端分离的架构，需要前后端协同完成实现需求

**前端**：负责页面渲染，处理页面上的交互  
**后端**：提供数据接口，实现数据存储

前端部分的修改在当前目录下的 `assignment-todo-js`,  
前端部分的介绍请查看 `assignment-todo-js/README.md`

后端部分的修改在当前目录下的 `assignment-todo-java-web-api`  
前端部分的介绍请查看 `assignment-todo-java-web-api/README.md`

## setup
### 启动前端环境
确保以下命令是在 assignment-todo-js 目录下执行
```
// 进入前端目录
cd assignment-todo-js

// 下载依赖
npm install

// 启动前端服务
npm start

// 启动 json-server (如果后端服务没有准备好的话)
npm run server

// 运行前端测试 (需要先启动前端服务和json-server)
npm run test

// 运行 e2e 测试  (需要先启动前端服务和后端服务)
npm run test:e2e
```


### 启动后端环境
确保以下命令是在 assignment-todo-java-web-api 目录下执行
```
// 进入后端目录
cd assignment-todo-java-web-api

// 构建后端项目
./gradlew clean build

// 启动 基于 docker 的 mysql 容器
./start-mysql-from-docker.sh

// 启动后端服务
./gradlew run
```

## 提交要求
- 请在 coach 建议的完成时间内提交，提交时请确保录屏也已完成；
- 前后端分别录屏，各自时长 40 分钟，**无需在规定时长完成所有需求**，获取录屏的具体方式请写在根目录下的 RECORDING.md 中；
- 录屏中，buddy 主要看大家在这个过程中的思路和工程实践，**不要写完只讲代码，要录写的过程**；
- 通过金数据表单提交 assignment，Assignment Repo Name 填写：`assignment-todo-web-app` ，提交成功后会收到系统通知；
- buddy 批改会使用提交时间点所对应的版本，请务必在确认无误后再进行提交；
