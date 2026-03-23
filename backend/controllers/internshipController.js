import Internship from "../models/Internship.js";

/* ================= GET ALL INTERNSHIPS ================= */
export const getInternships = async (req, res) => {
  try {
    const internData = await Internship.find({});
    return res.status(200).json({
      success: true,
      count: internData.length,
      data: internData,
    });
  } catch (error) {
    console.error("getInternships error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= CREATE INTERNSHIP ================= */
export const createInternship = async (req, res) => {
  try {
    const { id } = req.user || {};

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in.",
      });
    }

    const { title, company, description, skills, location, stipend, duration } = req.body;

    if (!title || !company || !description || !skills) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    const newInternship = new Internship({
      title,
      company,
      description,
      skills,
      location,
      stipend,
      duration,
      postedBy: id,
    });

    await newInternship.save();

    res.status(201).json({
      success: true,
      message: "Internship posted successfully!",
      data: newInternship,
    });
  } catch (error) {
    console.error("createInternship error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};