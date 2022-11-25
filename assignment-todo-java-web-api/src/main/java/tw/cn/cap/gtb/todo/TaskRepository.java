package tw.cn.cap.gtb.todo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

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

}