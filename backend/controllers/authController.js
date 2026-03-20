import Alumni from "../models/Alumni.js";
import Admin from "../models/Admin.js";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= ALUMNI REGISTER ================= */
export const alumniRegister = async (req, res) => {
  try {
    const { username, email, enrollmentNumber, linkedIn, isMentor, password } = req.body;

    const existing = await Alumni.findOne({
      $or: [{ email }, { enrollmentNumber }],
    });

    if (existing) {
      return res.status(400).json({ message: "Email or Enrollment already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const alumni = await Alumni.create({
      username,
      email,
      enrollmentNumber,
      linkedIn,
      isMentor,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: alumni._id, role: "alumni" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: alumni._id,
        username: alumni.username,
        email: alumni.email,
        role: "alumni",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration" });
  }
};

/* ================= ADMIN REGISTER ================= */
export const adminRegister = async (req, res) => {
  try {
    const { username, email, permission, collegeDeptName, collegeCode, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username,
      email,
      permission,
      collegeDeptName,
      collegeCode,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      user: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: "admin",
        permission: admin.permission,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= STUDENT REGISTER ================= */
export const studentRegister = async (req, res) => {
  try {
    const { username, email, enrollmentNumber, linkedIn, password } = req.body;

    const existing = await Student.findOne({
      $or: [{ email }, { enrollmentNumber }],
    });

    if (existing) {
      return res.status(400).json({ message: "Email or Enrollment already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      username,
      email,
      enrollmentNumber,
      linkedIn,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Student registered successfully",
      token,
      user: {
        id: student._id,
        username: student.username,
        email: student.email,
        role: "student",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    if (role === "student") {
      user = await Student.findOne({ email }).select("+password");
    } else if (role === "admin") {
      user = await Admin.findOne({ email }).select("+password");
    } else if (role === "alumni") {
      user = await Alumni.findOne({ email }).select("+password");
    }

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid Email or Role" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ success: false, message: "Server configuration error" });
    }

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role,
      },
    });
  } catch (error) {
    console.error("Login Controller Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET MENTORS ================= */
export const getMentors = async (req, res) => {
  try {
    const mentors = await Alumni.find({ isMentor: true }).select("-password");

    res.status(200).json({
      success: true,
      data: mentors,
    });
  } catch (error) {
    console.error("getMentors error:", error);
    res.status(500).json({ success: false, message: "Error fetching mentors" });
  }
};

/* ================= GET ALL ALUMNI ================= */
export const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find({}).select("-password");

    res.status(200).json({
      success: true,
      data: alumni,
    });
  } catch (error) {
    console.error("Error fetching alumni directory:", error);
    res.status(500).json({ success: false, message: "Server Error fetching directory" });
  }
};

/* ================= ME (authenticated profile) ================= */
export const getMe = async (req, res) => {
  try {
    const { id, role } = req.user || {};
    if (!id || !role) {
      return res.status(400).json({ success: false, message: "Invalid token payload" });
    }

    if (role === "student") {
      const user = await Student.findById(id).select("username email enrollmentNumber linkedIn role");
      if (!user) return res.status(404).json({ success: false, message: "User not found" });

      return res.status(200).json({
        success: true,
        user: { ...user.toObject(), id: user._id.toString(), role },
      });
    }

    if (role === "alumni") {
      const user = await Alumni.findById(id).select("username email enrollmentNumber linkedIn isMentor");
      if (!user) return res.status(404).json({ success: false, message: "User not found" });

      return res.status(200).json({
        success: true,
        user: { ...user.toObject(), id: user._id.toString(), role },
      });
    }

    if (role === "admin") {
      const user = await Admin.findById(id).select("username email permission collegeDeptName collegeCode role");
      if (!user) return res.status(404).json({ success: false, message: "User not found" });

      return res.status(200).json({
        success: true,
        user: { ...user.toObject(), id: user._id.toString(), role },
      });
    }

    return res.status(400).json({ success: false, message: "Unknown role" });
  } catch (error) {
    console.error("getMe error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= UPDATE ME ================= */
export const updateMe = async (req, res) => {
  try {
    const { id, role } = req.user || {};
    if (!id || !role) {
      return res.status(400).json({ success: false, message: "Invalid token payload" });
    }

    const {
      username,
      password,
      linkedIn,
      isMentor,
      permission,
      collegeDeptName,
      collegeCode,
    } = req.body || {};

    const update = {};
    if (typeof username === "string" && username.trim().length > 0) update.username = username.trim();

    if (password && typeof password === "string" && password.trim().length > 0) {
      update.password = await bcrypt.hash(password, 10);
    }

    if (role === "student") {
      if (linkedIn !== undefined) update.linkedIn = linkedIn;

      const updated = await Student.findByIdAndUpdate(id, update, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: "User not found" });

      return res.status(200).json({
        success: true,
        user: { ...updated.toObject(), id: updated._id.toString(), role },
      });
    }

    if (role === "alumni") {
      if (linkedIn !== undefined) update.linkedIn = linkedIn;
      if (isMentor !== undefined) update.isMentor = !!isMentor;

      const updated = await Alumni.findByIdAndUpdate(id, update, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: "User not found" });

      return res.status(200).json({
        success: true,
        user: { ...updated.toObject(), id: updated._id.toString(), role },
      });
    }

    if (role === "admin") {
      if (permission !== undefined) update.permission = permission;
      if (collegeDeptName !== undefined) update.collegeDeptName = collegeDeptName;
      if (collegeCode !== undefined) update.collegeCode = collegeCode;

      const updated = await Admin.findByIdAndUpdate(id, update, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: "User not found" });

      return res.status(200).json({
        success: true,
        user: { ...updated.toObject(), id: updated._id.toString(), role },
      });
    }

    return res.status(400).json({ success: false, message: "Unknown role" });
  } catch (error) {
    console.error("updateMe error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};