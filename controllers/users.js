const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: `Cannot find user with id=${userId}.`,
      });
    }
    res.status(200).json(user);
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

    const user = await User.create({ name, email });

    res.status(201).json(user.dataValues);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const [isUpdated] = await User.update(req.body, {
      where: { id: userId },
    });

    if (!isUpdated) {
      res.status(400).json({
        message: `Cannot update user with id=${userId}. Maybe user was not found or req.body is empty!`,
      });
    }

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

    const isRemoved = await User.destroy({ where: { id: userId } });

    if (!isRemoved) {
      return res.status(400).json({
        message: `Cannot remove user with id=${userId}. Maybe user was not found!`,
      });
    }

    res.status(200).json({ message: `User removed with ID: ${userId}` });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
