const User = require("../model/usermodel.js");
const mongoose = require("mongoose");

// Create user
const createuser = async (req, res) => {
    try {
        const userdata = new User(req.body);

        if (!userdata) {
            return res.status(500).json({ message: "Please fill the fields" });
        }

        // ❌ Mistake: You forgot to await + wrong check
        const existingemail = await User.findOne({ email: req.body.email }); // ✅ Corrected
        if (existingemail) {
            return res.status(500).json({ message: "Email already exists" });
        }

        await userdata.save();
        return res.status(200).json(userdata);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all users
const getallusers = async (req, res) => {
    try {
        const allusers = await User.find();
        if (allusers.length === 0) { // ✅ Check if empty array
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(allusers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user - PUT (overwrite)
const Updateuserput = async (req, res) => {
    try {
        const userid = req.params.id;
        const { name, email, password, Mobile } = req.body;

        if (!name || !email || !password || !Mobile) {
            return res.status(402).json({ message: "All fields are required" });
        }

        const updateduser = await User.findByIdAndUpdate(
            userid,
            { name, email, password, Mobile },
            {
                new: true,
                overwrite: true, // ✅ Overwrites the document
            }
        );

        if (!updateduser) {
            return res.status(404).json({ message: "404 user not found" });
        }
        return res.status(200).json(updateduser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user - PATCH (partial update)
const Updateuserpatch = async (req, res) => {
    try {
        const userid = req.params.id;
        const { name, email, password, Mobile } = req.body;

        const updateduser = await User.findByIdAndUpdate(
            userid,
            { name, email, password, Mobile },
            { new: true }
        );

        if (!updateduser) {
            return res.status(404).json({ message: "User with ID not found" });
        }

        return res.status(200).json(updateduser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete user
const deleteuser = async (req, res) => {
    try {
        const userid = req.params.id;
        const deleteduser = await User.findByIdAndDelete(userid); // ✅ Corrected spelling

        if (!deleteduser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(deleteduser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createuser, getallusers, Updateuserput, Updateuserpatch, deleteuser };
