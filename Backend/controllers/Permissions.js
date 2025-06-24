const Controls = require('../models/Controls');

// Create new Controls
exports.createControls = async (req, res) => {
    try {
        const { createProject, createUser } = req.body;

        const newControl = new Controls({
            createProject: createProject || false,
            createUser: createUser || false
        });

        await newControl.save();
        res.status(201).json({
            success: true,
            message: "Control created successfully",
            data: newControl
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
///get al component s
// exports .getall Cnrtolesm = asynvm
// Get all Controls
exports.getAllControls = async (req, res) => {
    try {
        const controls = await Controls.find();
        res.status(200).json({
            success: true,
            data: {
                createProject: controls.createProject, 
                createUser: controls.createUser
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// Update a specific Control
exports.updateControls = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedControl = await Controls.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedControl) {
            return res.status(404).json({
                success: false,
                message: "Control not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Control updated successfully",
            data: updatedControl
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// Delete a Control
exports.deleteControls = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedControl = await Controls.findByIdAndDelete(id);

        if (!deletedControl) {
            return res.status(404).json({
                success: false,
                message: "Control not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Control deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
