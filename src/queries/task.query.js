const QUERY = {
    SELECT_TASKS: 'SELECT * FROM tasks ORDER BY created_at DESC LIMIT 100',
    SELECT_TASK: 'SELECT * FROM tasks WHERE id = ?',
    CREATE_TASK: 'INSERT INTO tasks(id, title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)',
    UPDATE_TASK: 'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ?',
    DELETE_TASK: 'DELETE FROM tasks WHERE id = ?',
};

export default QUERY;