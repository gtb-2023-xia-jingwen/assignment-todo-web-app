# TODO List JS Assignment

## 需求说明

### Story 1 显示 Task 列表

作为一个用户，我应当能看到已经添加过的 Task。包括 TODO 列表和 Completed 列表。  
若 Task Items 较多，则会出现纵向滚动条。 效果如下：
![todo-list](document/list.jpg)

### Story 2 添加 Task

作为一个用户，我应当能够添加 Task。这样我就可以创建待办事项列表了。

#### AC 1 添加 Task

* 我应当能够在输入框（就是 Enter you todo item 那个输入框）中输入 TODO item 的内容（内容为纯文本）。
* 当我输入完毕之后，点击 “+” 按钮就可以在 TODO 列表中第一个位置添加一个新的 item，且它的文本应该和我输入的文本一致。
* 当新的 task 添加完毕之后，应当清空输入框中的文字。

#### AC 2 避免开头和结尾的空格

* 当我输入的文本的开头和结尾含有空白字符的时候，在添加过程中应当去掉这些空白字符。例如我输入 “  Good  ”，则最终添加的内容应当是 “Good”。空白字符以 `String.prototype.trim` 的默认情况为准。

#### AC 3 错误检查

* 当我输入的文本为空文本时，或我输入的文本全部为空白字符的时候。应当显示一个错误消息：“Please input something first.”
* 错误消息的应当在 Enter your todo item 下方。
* 但是当我成功的添加了一个 Task 之后，错误信息应当消失。

![add](document/add-task.gif)

### Story 3 删除待办事项

#### AC 1 删除未完成的 Task item

* 当鼠标放在 TODO task item 上时，显示"删除"按钮，点击"删除"按钮，该条 item 从列表消失。

#### AC 1 删除已完成的 Task item

* 当鼠标放在 Completed task item 上时，显示"删除"按钮，点击"删除"按钮，该条 item 从列表消失。

![remove](document/remove.gif)


### Story 4 标记完成状态

作为一个用户，我希望更明显的显示一个 Task item 是否已经完成。这样我更容易看清整体的任务情况。

#### AC 1 完成状态的显示与切换

* 当一个 TODO task item 被标记为完成状态（checkbox 被勾选）的时候，item 应该从 TODO List 移除，并且出现在 Completed List。
* 当一个 TODO task item 被重新激活（checkbox 取消勾选）的时候，item 应该从 Completed List 移除，并且出现在 TODO List。

![switch-checked](document/mark.gif)

### Story 5 修改 Task 内容

作为一个用户，我可以修改已经创建的 Task 内容。

#### AC 1 编辑完成

* 当鼠标点击 Task 内容区域，显示 input 输入框，自动focus，placeholder 为当前内容，用户可以输入新的内容，按 "回车键"，修改成功，显示新的内容，输入框消失。

#### AC 1 取消编辑

* 当鼠标点击 Task 内容区域，显示 input 输入框，自动focus，点击其他地方，输入框消失，原来 Task 内容不变。

![edit](document/edit.gif)


## 架构图
![todo-list](document/architecture.png)

## 前端环境准备

### 下载依赖

```bash
npm install
```

### 运行网站

请执行如下代码运行网站并打开页面：

```bash
npm start
```
之后在浏览器中访问：http://localhost:1234

### 启动 Json Server

```
npm run server
```
启动 json server 后可以，可以使用以下 API      
- 获取 tasks 数据:  
```
  URL: 'http://localhost:8080/tasks'
  Method: GET
  Response status: 200
  Response body 示例: [{id: 1, name: 'xx', completed: false}, {id: 2, name: 'xx', completed: false}]
```
- 创建 task:   
```
  URL: 'http://localhost:8080/tasks'
  Method: POST
  Request body 示例: {name: 'xx', completed: false}
  Response status: 201
  Response body 示例: {id: 1, name: 'xx', completed: false}
```
- 删除指定 id 的 task: 
```
  URL: 'http://localhost:8080/tasks${id}'
  Method: DELETE,
  Response status: 204
  Response body 示例: {}
```
- 修改指定 id 的 task: 
```
  URL: 'http://localhost:8080/tasks${id}'
  Method: PUT,
  Request body 示例: {name: 'xx', completed: false}
  Response status: 200
  Response body 示例: {id: 1, name: 'xx', completed: false}
```

#### 注意
- **json server 是用来 Mock 真实 API 的，当后端 API 没有准备好的时候可以使用 json-server Mock API 返回值，当后端 API 准备好之后关闭 json-server，直接请求后端提供的 API 即可**  
- **前端测试的时候也需要启动json-server Mock API 返回值**

### 运行测试

**具体操作可以查看运行测试Demo视频**

#### 前端测试
后端没有准备好的情况下，运行测试前需要先启动本地 Mock Api Server (json-server)
```
npm run server
npm start
npm run test 
```
#### 端到端测试
前后端都准备好的情况下，运行端到端测试
```
// 去到后端项目目录下启动后端服务
./start-mysql-from-docker.sh 
./gradlew run

// 在前端项目目录下启动前端服务，然后运行测试
npm start
npm run test:e2e
```
**注意：我们 buddy review 的时候是运行的是端到端的测试**

#### 运行单个测试
```
// 默认是前端的测试 （启用 json-server 的时候）
cypress run --spec "cypress/integration/add_task.test.js"

// 如果想跑单个的端到端测试
cypress run --spec "cypress/integration/add_task.test.js" --env scene=e2e
```

如果测试失败，可以在 `cypress/screenshots` 查看失败的截图

#### 关于测试细节
**请先阅读 `cypress/integration/*` 目录下的测试代码, 测试通过对 html 以及 class 命名有一定要求，不要修改 index.html 文件**

### Lint 检查

如需对代码执行 Lint 检查，请执行如下命令：

```bash
$ npm run lint
```

## 我应该学到什么？

Assignment 的目的是学以致用，在运用当前 step 所学的知识和技能合理完成题目要求的前提下，你 应该/可能 会使用（但不限于）以下内容：

1. 使用 git 完成本地的提交管理及与远端的各种同步操作；
2. 使用 npm 安装项目依赖，运行项目，运行测试脚本等基本操作；
3. 使用 JavaScrip 完成 Web Page 的开发：
   - 异步请求 promise：获取 API 数据，提交数据
   - 数组，对象的操作：本地数据的管理
   - DOM 操作：渲染页面（插入，修改 DOM 元素及属性等）
   - 事件监听以及处理： 处理页面上的交互动作
   - modules：拆分 JS 文件 (import && export) 
4. 了解当前端对后端有依赖的时候，可以使用 mock server 代替；
5. 了解 Cypress 测试

**如果你在完成 assignment 后，发现以上的大部分内容都并未涉及（使用）到，请及时联系 coach 进行沟通。**
