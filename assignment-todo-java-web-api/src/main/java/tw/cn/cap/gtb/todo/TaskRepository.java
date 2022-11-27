package tw.cn.cap.gtb.todo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class TaskRepository {
    final static String USER = "root";
    final static String PASSWORD = "p@ssword";
    final static String CONN_URL = "jdbc:mysql://localhost:13306/todoapp";

    public void createTable() throws SQLException {
        try (
                Connection conn = getConnection();
                PreparedStatement pstat = conn.prepareStatement(
                        " CREATE TABLE IF NOT EXISTS `tasks` (\n" +
                                "    `id` BIGINT AUTO_INCREMENT PRIMARY KEY ,\n" +
                                "    `name` VARCHAR(255) NOT NULL ,\n" +
                                "    `completed` BOOLEAN NOT NULL DEFAULT (0));\n");
        ) {
            pstat.executeUpdate();
        }
    }

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(CONN_URL, USER, PASSWORD);
    }

    public long createTask(String name) throws SQLException {
        try (
                Connection conn = getConnection();
                PreparedStatement pstat = conn.prepareStatement(
                        "INSERT INTO `tasks` (`name`) values (?)", Statement.RETURN_GENERATED_KEYS);
        ) {
            pstat.setString(1, name);
            pstat.executeUpdate();
            ResultSet rs = pstat.getGeneratedKeys();
            rs.next();
            return rs.getLong(1);
        }
    }

    public List<Task> getAllTask() throws SQLException {
        try (
                Connection conn = getConnection();
                PreparedStatement pstat = conn.prepareStatement("SELECT * FROM `tasks`");
        ) {
            ResultSet rs = pstat.executeQuery();
            List<Task> tasks = new ArrayList<>();
            while (rs.next()) {
                long id = rs.getLong("id");
                String name = rs.getString("name");
                boolean completed = rs.getBoolean("completed");
                Task task = new Task(id, name, completed);
                tasks.add(task);
            }
            return tasks;
        }
    }

    public void updateTask(Task task) throws SQLException {
        try (
                Connection conn = getConnection();
                PreparedStatement pstat = conn.prepareStatement(
                        "UPDATE `tasks` SET `name`=?, `completed`=?  WHERE `id`=?");
        ) {
            pstat.setString(1, task.getName());
            pstat.setBoolean(2, task.isCompleted());
            pstat.setLong(3, task.getId());
            pstat.executeUpdate();
        }
    }

    public boolean getTaskById(long id) throws SQLException {
        try (
                Connection conn = getConnection();
                PreparedStatement pstat = conn.prepareStatement("" +
                        "SELECT * FROM `tasks` WHERE `id`=?");
        ) {
            pstat.setLong(1, id);
            ResultSet rs = pstat.executeQuery();
            return rs.next();
        }

    }

    public void deleteTaskById(long id) throws SQLException {
        try (
                Connection conn = getConnection();
                PreparedStatement pstat = conn.prepareStatement(
                        "DELETE FROM `tasks` WHERE `id`=?")
        ) {
            pstat.setLong(1, id);
            pstat.executeUpdate();
        }
    }
}
