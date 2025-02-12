import Hospital from '../models/index.js';
import User from '../models/index.js';
const hospitalsController = {
   
  createHospitals : async (req, res) => {
    const hospitalData = req.body; 
    try {
      const newHospital = new Hospital(hospitalData); 
      await newHospital.save();
      res.status(201).json({
        success: true,
        data: newHospital,
        message: 'Hospital created successfully'
      });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  },

  getHospitals: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10; 
      const skip = (page - 1) * limit; 
      const allHospitals = await Hospital.find() 
        .skip(skip)
        .limit(limit);
      const totalHospitals = await Hospital.countDocuments();
      res.json({
        success: true,
        data: allHospitals,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalHospitals / limit), 
          totalRecords: totalHospitals,
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  },
  
  updateHospital: async (req, res) => {
    const hospitalID  = req.query.hospitalID; 

    const updatedData = req.body;      
    try {
      const hospital = await Hospital.findByIdAndUpdate(hospitalID, updatedData, { new: true });
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }
      return res.status(200).json({
        message: "Hospital updated successfully",
        hospital
      });
    } catch (error) {
      console.error("Error updating hospital:", error);
      return res.status(500).json({ message: "Error updating hospital", error: error.message });
    }
  },
  
  
};

export default hospitalsController;
