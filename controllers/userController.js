const userModel = require("../models/userModel");
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (exception) {
    res.status(400).json({
      success: false,
      exception,
    });
  }
};

const registrationController = async (req, res) => {
  try {
    let user = new userModel(req.body);
    await user.save();
    res.status(201).json({
      success: true,
      user,
    });
  } catch (exception) {
    res.status(400).json({
      success: false,
      exception,
    });
  }
};

module.exports = { loginController, registrationController };
