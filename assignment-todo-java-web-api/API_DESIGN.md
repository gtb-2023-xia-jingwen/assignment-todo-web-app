# API 列表

需开发完成的 Java Web Application 需提供以下 API：

* 创建 task
* 获取 task 列表
* 更新 task
* 删除 task

## 返回结果说明

使用标准 HTTP Status Code 来标识返回结果成功或失败与否。

使用的 Status Code 范围如下表：

| HTTP Status Code    | Summary                       |
|---------------------|-------------------------------|
| 200 - OK            | 查询操作一切正常，返回 200 及查询结果         |
| 201 - Created       | 创建操作成功，返回 201                 |
| 204 - No Content    | 用于 DELETE 或 某些 POST 等操作无返回数据时 |
| 400 - Bad Request   | 请求参数不符合要求，通常是因为参数格式不正确或参数缺失   |
| 404 - Not Found     | 请求的资源不存在                      |
| 500 - Server Errors | 请求在处理时遇到服务器错误                 |

除了返回对应的 Status Code 外，对于出错的情况，还需返回 ErrorResult 对象，字段如下：

| 字段:类型          | 说明                                      |
|----------------|-----------------------------------------|
| message:string | 错误提示信息，内容可以自行编写，表意即可。如：Cannot find task |

### EXAMPLE

错误返回示例：请求删除一个不存在的 id 时

```shell
$ curl -X DELETE localhost:8080/tasks/1000
{
  "message": "Cannot find task"
}
```

## 创建 task

### ENDPOINT

POST /tasks

### REQUEST

#### Body

提供 task 对象的以下字段：

| 字段:类型       | 是否必需 | 说明    |
|:------------|------|:------|
| name:string | 是    | 任务名字。 |

### RESPONSE

#### Status

成功时返回状态码为 201 （含义为 Created）

参数校验失败时返回状态码为 400 （含义为 Bad Request）

服务端异常时返回状态码为 500 （含义为 Internal Server Error）

#### Body

| 字段:类型              | 说明    |
|--------------------|-------|
| id:long            | ID。   |
| name:string        | 名字。   |
| completed:boolean  | 是否完成。 |

### EXAMPLE

```shell
$ curl -X POST 'localhost:8080/tasks'
# Request Body
{
    "name": "task01"
}
# Response Body
{
    "id": "1",
    "name": "task01",
    "completed": false
}
```

## 查询 task

返回查询的 task 列表

* 如请求 URL 中不包含 completed 参数，则返回所有 task 元素（包含待完成与已完成的）；
* 如请求 URL 中包含 completed 参数，其值不为 true/false，则返回所有 task 元素（包含待完成与已完成的）；
* 如请求 URL 中包含 completed 参数，其值为 true/false，则根据 completed 参数取值进行过滤，返回过滤后的 task 元素。

### ENDPOINT

GET /tasks

### REQUEST

#### PARAMETER

`completed`: 是否完成。true 表示完成，false 表示未完成。

### RESPONSE

#### STATUS

成功时返回状态码为 200 （含义为 OK）

服务端异常时返回状态码为 500 （含义为 Internal Server Error）

#### BODY

查询成功会返回 task 列表，列表中每个元素结构如下：

| 字段:类型              | 说明    |
|--------------------|-------|
| id:long            | ID。   |
| name:string        | 名字。   |
| completed:boolean  | 是否完成。 |

### EXAMPLE

#### EXAMPLE 1

```shell
$ curl 'localhost:8080/tasks'
# Response Body
[
    {
        "id": "1",
        "name": "task01",
        "completed": true
    },
    {
        "id": "2",
        "name": "task02",
        "completed": true
    },
    {
        "id": "3",
        "name": "task03",
        "completed": false
    },
    {
        "id": "4",
        "name": "task04",
        "completed": false
    }
]
```

#### EXAMPLE 2

```shell
$ curl 'localhost:8080/tasks?completed=true'
# Response Body
[
    {
        "id": "1",
        "name": "task01",
        "completed": true
    },
    {
        "id": "2",
        "name": "task02",
        "completed": true
    }
]
```

#### EXAMPLE 3

```shell
$ curl 'localhost:8080/tasks?completed=false'
# Response Body
[
    {
        "id": "3",
        "name": "task03",
        "completed": false
    },
    {
        "id": "4",
        "name": "task04",
        "completed": false
    }
]
```

## 更新 task

### ENDPOINT

PUT /tasks/{id}

### REQUEST

#### Body

| 字段:类型             | 说明     |
|-------------------|--------|
| name:string       | 任务名称。  |
| completed:boolean | 是否已完成。 |

### RESPONSE

更新成功会返回更新后的 task

#### Status

成功时返回 200（含义为 OK）

`{id}` 不存在时返回 404 含义为（Not Found）

参数校验失败时返回状态码为 400 （含义为 Bad Request）

服务端异常时返回状态码为 500 （含义为 Internal Server Error）

#### Body

| 字段:类型              | 说明    |
|--------------------|-------|
| id:long            | ID。   |
| name:string        | 名字。   |
| completed:boolean  | 是否完成。 |

### EXAMPLE

```shell
$ curl -X PUT 'localhost:8080/tasks/1'
# Request Body
{
    "name": "task01",
    "completed": true
}
# Response Body
{
    "id": "1",
    "name": "task01",
    "completed": true
}
```

## 删除 task

### ENDPOINT

DELETE /tasks/{id}

### REQUEST

#### Path Variable

| 字段:类型   | 说明     |
|---------|--------|
| id:long | 任务 ID。 |

### RESPONSE

#### Status

成功时返回 204 No Content

`{id}` 不存在时返回 404 Not Found

服务端异常时返回状态码为 500 （含义为 Internal Server Error）

### EXAMPLE

```shell
$ curl -X DELETE 'localhost:8080/tasks/1'
# 无 Request Body
# 无 Response Body
```
