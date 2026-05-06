const express = require("express");
const mongoose = require("mongoose");
const Course = require("../models/Course");

const router = express.Router();


// POST /courses
router.post("/", async (req, res) => {
  try {
    const { courseName, trainer, duration, fees } = req.body;

    // Validation
    if (!courseName || !trainer || !duration || !fees) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (duration <= 0 || fees <= 0) {
      return res.status(400).json({
        success: false,
        message: "Duration and fees must be greater than 0",
      });
    }

    const course = await Course.create({
      courseName,
      trainer,
      duration,
      fees,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// GET /courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// BONUS API
// GET /courses/cheap
router.get("/cheap", async (req, res) => {
  try {
    const courses = await Course.find({
      fees: { $lt: 5000 },
    });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// GET /courses/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// PUT /courses/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { courseName, trainer, duration, fees } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    if (duration <= 0 || fees <= 0) {
      return res.status(400).json({
        success: false,
        message: "Duration and fees must be greater than 0",
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        courseName,
        trainer,
        duration,
        fees,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// DELETE /courses/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;