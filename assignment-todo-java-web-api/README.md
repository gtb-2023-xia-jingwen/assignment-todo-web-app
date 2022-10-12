# TODO List Java Assignment

## 需求说明

开发一个 Java Web Application，提供 API 供前端 App 调用。

需要实现的 API 请查看 [API_DESIGN.md](API_DESIGN.md) ，**请务必注意**：

1. 请 **严格按照** 要求来实现，保证各个细节上准确无误。例如：
   1. 字段名称、类型
   1. URL、HTTP method，以及 response status code
1. 需求中对于任何不确定的细节，请及时跟 coach 联系、确认；

## 技术要求

1. 在代码库的根目录下，可以通过以下方式运行你的 Java Web Application：
   1. `./gradlew run`
1. 请统一使用默认的 **8080** 端口，无需使用 HTTPS；
1. 不允许修改 build.gradle 文件，如有特殊原因，请先跟 coach 进行沟通；
1. 不允许以任何形式自行添加任何其它第三方依赖或库到代码库中；
1. 如需在磁盘上保存任何数据，请确保符合以下要求：
   1. 请使用 **MySQL数据库** 存储应用所需数据，不可以使用文件等其他方式；
   1. 请使用代码仓库提供的 `start-mysql-from-docker.sh`，`stop-mysql-from-docker.sh` 脚本启停 **MySQL数据库**；
   1. 数据库启停脚本基于 Docker ，使用启停脚本时请确保你的 Docker 应用（软件）是 **运行中** 的
   1. 所需的数据表名字需定义为 **tasks** （请注意此项，否则会影响自动化测试的运行结果），表结构可以自行设计；
   1. 数据库的连接方式可参考 `homework-jdbc-answer` 的实现；
1. 数据库连接信息：
   1. **username**: root
   1. **password** : p@ssword
   1. **database** : todoapp
   1. **host** : localhost
   1. **port** : 13306
1. 使用 Git 进行版本管理：
   1. 小步提交；
   1. 使用合理的 commit message；
   1. Commit message 格式需符合 [Conventional Commits](https://www.conventionalcommits.org/) ；
1. 以下使用场景，它们不在目标考查范围内，你无需为它们做特别处理：
   1. 并发的使用场景，换言之，就是无需考虑是否有多个使用者和（/或）多处在同时访问某个 API；
   1. 不必为可创建的任务数量的上限做任何处理，即可以支持无限多的任务，直到 系统/机器 挂掉为止；（我们目前不会这样去 使用/测试 它）
   1. 任务标题的长度也无需做任何限制，同上，我们不会变态的去做这样的测试；（但不代表未来真实的项目里没有这种人或这样的情况😁）
