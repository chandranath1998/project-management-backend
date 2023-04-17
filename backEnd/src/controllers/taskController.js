const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");

exports.createTask = async (req, res) => {
  try {
    let data = req.body;

    let userId = req.params.userId;

    let checkUser = await userModel.findOne({
      _id: userId,
    });

    if (!checkUser)
      return res.status(404).send({
        status: false,
        message: "user not found",
      });

    if (checkUser.role == "Manager") {
      let taskData = await taskModel.create(data);

      return res.status(201).send({
        status: true,
        data: taskData,
      });
    } else {
      return res.status(403).send({
        status: true,
        message: "you are not authorized to create task ",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    let userId = req.params.userId;

    let checkUserDetails = await userModel.findOne({
      _id: userId,
    });

    if (checkUserDetails.role == "Manager") {
      let taskDetails = await taskModel.find();
      return res.status(200).send({
        taskDetails,
      });
    }
    let userFind = await taskModel.find({
      assigning: userId,
    });

    res.status(200).send({
      status: true,
      data: userFind,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    let userId = req.params.userId;
    let data = req.body;
    if (!data) {
      return res.status(400).send({
        status: false,
        message: "please provide some data for update",
      });
    }

    let updateStatus = await taskModel.findOneAndUpdate(
      {
        assigning: userId,
      },
      {
        status: data.status,
      }
    );
    if (!updateStatus) {
      return res.status(404).send({
        status: false,
        message: "no such user found",
      });
    }
    res.status(200).send({
      status: "Success",
      data: updateStatus,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    let userId = req.params.userId;

    let managerDetails = await userModel.findOne({
      _id: userId,
      isDeleted: false,
    });
    if (!managerDetails) {
      return res.status(404).send({
        status: false,
        message: " no such user found",
      });
    }
    if (managerDetails.role == "Manager") {
      await taskModel.findOneAndUpdate(
        {
          status: "completed",
        },
        {
          isDeleted: true,
        }
      ); // try to delete using date if due date is over but still task is not completed so we have to delete
      return res.status(204).send;
    } else {
      return res.status(403).send({
        status: false,
        message: "Sorry! You are not able to delete the task",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};
