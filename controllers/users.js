const pool = require('../queries');

exports.getUsers = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [
      userId,
    ]);

    if (!result.rows.length) {
      return res
        .status(404)
        .json({ message: `No user with the id of ${req.params.id}` });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: 'Please provide all the values',
      });
    }

    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
      [name, email]
    );

    res.status(201).json({
      message: `User added with ID: ${result.rows[0].id}`,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
      name,
      email,
      userId,
    ]);

    res.status(200).json({ message: `User modified with ID: ${userId}` });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    await pool.query('DELETE FROM users WHERE id = $1', [userId]);

    res.status(200).json({ message: `User removed with ID: ${userId}` });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
