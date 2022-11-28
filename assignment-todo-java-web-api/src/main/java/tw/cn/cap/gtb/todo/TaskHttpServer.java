package tw.cn.cap.gtb.todo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

public class TaskHttpServer {
    static final Logger LOGGER = Logger.getLogger(HttpServer.class.getName());
    public static final int BAD_REQUEST = 400;
    public static final int OK = 200;
    public static final int NOT_FOUND = 404;
    public static final int NO_CONTENT = 204;
    static TaskRepository taskRepository = new TaskRepository();
    public static final int CREATED = 201;
    public static final int INTERNAL_SERVER_ERROR = 500;


    public static void startServer() throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        HttpContext context = server.createContext("/task");
        context.setHandler(TaskHttpServer::handleRequest);
        server.start();
    }

    private static void handleRequest(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "Application/json");
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*"); // 跨源访问
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
        String reqMethod = exchange.getRequestMethod();
        LOGGER.info(reqMethod);
        switch (reqMethod) {
            case "POST":
                handlePostRequest(exchange);
                break;
            case "GET":
                handleGETAllTasksRequest(exchange);
                break;
            case "PUT":
                handleModifyTask(exchange);
                break;
            case "DELETE":
                handleDeleteTask(exchange);
                break;
            case "OPTIONS":
                handleOptionsRequest(exchange);
                break;
            default:
                break;
        }
    }

    private static void handleOptionsRequest(HttpExchange exchange) throws IOException {
        exchange.sendResponseHeaders(NO_CONTENT, -1);
        exchange.close();
    }

    private static void handleDeleteTask(HttpExchange exchange) throws IOException {
        // 参数校验
        Long id = checkParams(exchange);
        if (id == null) return;
        try {
            // 查询id是否存在
            boolean isExist = taskRepository.getTaskById(id);
            if (!isExist) {
                String msg = "Not Found.";
                sendMsg(msg.getBytes(), exchange, NOT_FOUND);
                return;
            }
            // 执行删除操作
            taskRepository.deleteTaskById(id); // 500
            exchange.sendResponseHeaders(NO_CONTENT, -1);
            exchange.close();
        } catch (SQLException e) {
            sendMsg(e.getMessage().getBytes(), exchange, INTERNAL_SERVER_ERROR);
        }
    }

    private static void handleModifyTask(HttpExchange exchange) throws IOException {
        Long id = checkParams(exchange);
        if (id == null) return;
        try {
            // 查询id是否存在
            boolean isExist = taskRepository.getTaskById(id);
            if (!isExist) {
                String msg = "Not Found.";
                sendMsg(msg.getBytes(), exchange, NOT_FOUND);
                return;
            }
            // 执行更新操作
            ObjectMapper mapper = new ObjectMapper();
            Task task = mapper.readValue(exchange.getRequestBody(), Task.class);
            task.setId(id);
            taskRepository.updateTask(task); // 500
            sendMsg(mapper.writeValueAsBytes(task), exchange, OK);
        } catch (SQLException e) {
            sendMsg(e.getMessage().getBytes(), exchange, INTERNAL_SERVER_ERROR);
        }
    }

    private static Long checkParams(HttpExchange exchange) throws IOException {
        String[] path = exchange.getRequestURI().getPath().split("/");
        boolean isParamOK = true;
        Long id = null;
        if (path.length != 3) {
            isParamOK = false;
        } else {
            try {
                id = Long.parseLong(path[2]);
            } catch (NumberFormatException e) {
                isParamOK = false;
            }
        }
        if (!isParamOK) { // 400
            String msg = "Invalid Parameters.";
            sendMsg(msg.getBytes(), exchange, BAD_REQUEST);
            return null;
        }
        return id;
    }

    private static void handleGETAllTasksRequest(HttpExchange exchange) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        String param = exchange.getRequestURI().getQuery();
        try {
            final List<Task> tasks = taskRepository.getAllTask(); // 500
            List<Task> filterTasks = tasks;
            if ("completed=true".equals(param)) {
                filterTasks = tasks.stream().filter(Task::isCompleted).collect(Collectors.toList());
            }
            if ("completed=false".equals(param)) {
                filterTasks = tasks.stream().filter(t -> !t.isCompleted()).collect(Collectors.toList());
            }
            final ByteArrayOutputStream out = new ByteArrayOutputStream();
            mapper.writeValue(out, filterTasks);
            sendMsg(out.toByteArray(), exchange, OK);
        } catch (IOException | SQLException e) {
            sendMsg(e.getMessage().getBytes(), exchange, INTERNAL_SERVER_ERROR);
        }
    }

    private static void handlePostRequest(HttpExchange exchange) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Task task = null;
        try {
            task = objectMapper.readValue(exchange.getRequestBody(), Task.class);
        } catch (IOException e) {
            sendMsg(e.getMessage().getBytes(), exchange, BAD_REQUEST);
            return;
        }
        try {
            long id = taskRepository.createTask(task.getName());
            task.setId(id);
            task.setCompleted(false);
            sendMsg(objectMapper.writeValueAsBytes(task), exchange, CREATED);
        } catch (SQLException | JsonProcessingException e) {
            sendMsg(e.getMessage().getBytes(), exchange, INTERNAL_SERVER_ERROR);
        }
    }

    private static void sendMsg(byte[] msg, HttpExchange exchange, int code) throws IOException {
        exchange.sendResponseHeaders(code, msg.length);
        OutputStream out = exchange.getResponseBody();
        out.write(msg);
        out.close();
    }
}
