const Crud = require("../models/crud");

const createController = async (req, res, next) => {
  try {
    const crud = await Crud.create({
      name: req.body.name,
      img: req.body.img,
      summary: req.body.summary,
    });
    if (crud) {
      res.status(201).json({
        message: "Data inserted sucessfully!",
        data: crud,
      });
    } else {
      res.status(400).json({
        message: "Data insertion failed!",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchController = async (req, res, next) => {
  try {
    const crud = await Crud.find({});
    if (crud) {
      res.status(201).json({
        message: "Data found sucessfully!",
        data: crud,
      });
    } else {
      res.status(400).json({
        message: "Data not found",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateController = async (req, res, next) => {
  try {
    const crud = await Crud.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (crud) {
      res.status(201).json({
        message: "Data updated sucessfully!",
        data: crud,
      });
    } else {
      res.status(400).json({
        message: "Data not found",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteController = async (req, res, next) => {
  try {
    const crud = await Crud.findByIdAndDelete(req.params.id);
    if (crud) {
      res.status(201).json({
        message: "Data deleted sucessfully!",
        data: crud,
      });
    } else {
      res.status(404).json({
        message: "Data not found",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createController,
  fetchController,
  updateController,
  deleteController,
};
