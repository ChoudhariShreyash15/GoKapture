const QUERY = {
    SELECT_USERS: 'SELECT * FROM users ORDER BY created_at DESC LIMIT 100',
    SELECT_USER: 'SELECT * FROM users WHERE username = ?',
    CREATE_USER: 'INSERT INTO users(id, username, password) VALUES (?, ?, ?)',
    UPDATE_USER: 'UPDATE users SET username = ?, password = ?',
    DELETE_USER: 'DELETE FROM users WHERE id = ?',
};

export default QUERY;