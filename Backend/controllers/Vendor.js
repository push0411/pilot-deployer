const Vendor = require('../models/Vendor'); // Adjust the path if needed

// Function to generate a unique vendor ID
function generateVendorID() {
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `VND${randomNumber}`;
}

exports.createVendor = async (req, res) => {
  try {
    const { name, email, contactNo, managerName, managerContact } = req.body;

    // Validate required fields
    if (!name || !email || !contactNo || !managerName || !managerContact) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Generate unique vendor ID
    const ID = generateVendorID();

    // Create new vendor document
    const newVendor = new Vendor({
      ID,
      name,
      email,
      contactNo,
      managerName,
      managerContact,
    });

    // Save to database
    await newVendor.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: "Vendor created successfully",
      vendorID: ID,
      vendorName:name
    });
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating vendor",
    });
  }
};


exports.getAllVendors = async (req, res) => {
  try{
    const vnds = await Vendor.find({});
    return res.status(201).json({
      success:true, 
      vnds
    });
  }catch(error){
    console.log(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      });
    }
};