# assignment-todo-web-app

本次 assignment 是完成一个 todo Web App, 采用前后端分离的架构，需要前后端协同完成实现需求

**前端**：负责页面渲染，处理页面上的交互  
**后端**：提供数据接口，实现数据存储

前端部分的修改在当前目录下的 `assignment-todo-js`,  
前端部分的介绍请查看 `assignment-todo-js/README.md`

后端部分的修改在当前目录下的 `assignment-todo-java-web-api`  
后端部分的介绍请查看 `assignment-todo-java-web-api/README.md`

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

## 关于 Review 的维度和标准

**代码的评价包括但不限于如下几个层方面:**
1. 功能实现
   1. 运行自动化测试，查看结果
2. 代码实现，buddy 会将建议放在 `reviews/code.md`
   1. 正确运用当前 Step 所学前后端知识实现需求
3. 工程实践，buddy 会将建议放在 `reviews/practices.md`
   1. 代码是否格式化
   2. 代码的命名是否有意义
   3. 代码是否小步提交，且 message 内容合理 
   4. 没有任何 warnings
   5. **快捷键使用**
      1. 补全代码（Mac: ⌥  + Enter / Windows: Alt + Enter）
      2. 提取变量 （Mac:  ⌘ + ⌥ + V / Windows: Ctrl + Alt + V）
      3. 提取常量 （Mac:  ⌘ + ⌥ + V / Windows: Ctrl + Alt + C）
      4. 提取方法 （Mac:  ⌘ + ⌥ + M / Windows: Ctrl + Alt + M）
      5. 格式化代码 (Mac:   ⌘ + ⌥ + L / Windows:  Ctrl + Alt + L)

主要判断对需求的实现程度，参考测试结果，分为四个级别：
1. **Level-0**：无法达到 Level-1 时，或录屏中代码绝大部分是 copy 过来，没有体现手动编写的过程的；
1. **Level-1**：能够显示 task 列表、创建 task 后能并且能够正确显示；编码过程中至少使用以上工程实践列出中的两组快捷键；
1. **Level-2**：能够满足基本需求（显示 task 列表，创建 task, 删除 task, Mark task 状态，允许 1-2 个需求有小的缺陷）；满足以上列出的大部分工程实践；
1. **Level-3**：实现所有需求并且没有任何错误；合理运用所学前后端知识（参考👇🏻我应该学到什么？）；以上列出的工程实践全部满足；

## 我应该学到什么？

Assignment 的目的是学以致用，在运用当前 step 所学的知识和技能合理完成题目要求的前提下，你 应该/可能 会使用（但不限于）以下内容：

### 前端
1. 使用 CLI git 完成本地的提交管理及与远端的各种同步操作；
2. 使用 npm 安装项目依赖，运行项目，运行测试脚本等基本操作；
3. 使用 JavaScrip 完成 Web Page 的开发：
    - 异步请求 promise：获取 API 数据，创建，修改，删除数据
    - 数组，对象的操作：本地数据的管理
    - DOM 操作：渲染页面（插入，修改 DOM 元素及属性等）
    - 事件监听以及处理： 处理页面上的交互动作
    - modules：拆分 JS 文件 (import && export)
4. 了解当前端对后端有依赖的时候，可以使用 mock server 代替；
5. 了解 Cypress 测试：运行测试，理解测试代码，测试失败能够查找原因并且修改代码通过测试
6. 常用快捷键的使用

### 后端
1. 使用 CLI git 完成本地的提交管理及与远端的各种同步操作；
2. 使用 Jackson 完成序列化与反序列化操作；
3. 使用 JDBC 连接并操作 MySQL 数据库；
4. 使用原生 Java 完成 Web API 的开发：
    1. GET、POST、PUT、DELETE 等方法的实现
    1. 跨域资源共享的概念及应用
5. 使用 Stream API 完成元素集合的处理：
    1. skip、map、collect 等操作符的使用
    1. Optional 的 orElseThrow 等方法的使用
6. 通过 Gradle 运行一个 Java Web Application；
7. 常用快捷键的使用

**如果你在完成 assignment 后，发现以上的大部分内容都并未涉及（使用）到，请及时联系 coach 进行沟通。**
