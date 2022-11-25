package tw.cn.cap.gtb.todo;

import java.sql.SQLException;
import java.util.logging.Logger;

public class TodoApp {
    static final Logger LOGGER = Logger.getLogger(TodoApp.class.getName());

    static TaskRepository taskRepository = new TaskRepository();

    private static void initialize() {
        try {
            taskRepository.createTable();
            LOGGER.info("Initialize successfully.");
        } catch (SQLException e) {
            LOGGER.info("Initialize failed. " + e);
        }
    }

    public static void main(String[] args) {
        initialize();
    }
}
