package tw.cn.cap.gtb.todo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.sql.SQLException;
import java.util.logging.Logger;

public class TaskHttpServer {
    static final Logger LOGGER = Logger.getLogger(HttpServer.class.getName());
    public static final int BAD_REQUEST = 400;
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
        String reqMethod = exchange.getRequestMethod();
        LOGGER.info(reqMethod);
        switch (reqMethod) {
            case "POST":
                handlePostRequest(exchange);
                break;
            default:
                break;
        }
    }

    private static void handlePostRequest(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "Application/json");
        ObjectMapper objectMapper = new ObjectMapper();
        Task task = null;
        try {
            task = objectMapper.readValue(exchange.getRequestBody(), Task.class);
        } catch (IOException e) {
            sendErrMsg(e.getMessage().getBytes(), exchange, BAD_REQUEST);
            return;
        }
        try {
            long id = taskRepository.createTask(task.getName());
            task.setId(id);
            task.setCompleted(false);
            sendErrMsg(objectMapper.writeValueAsBytes(task), exchange, CREATED);
        } catch (SQLException | JsonProcessingException e ) {
            sendErrMsg(e.getMessage().getBytes(), exchange, INTERNAL_SERVER_ERROR);
        }
    }

    private static void sendErrMsg(byte[] errMsg, HttpExchange exchange, int code) throws IOException {
        exchange.sendResponseHeaders(code, errMsg.length);
        OutputStream out = exchange.getResponseBody();
        out.write(errMsg);
        out.close();
    }
}
