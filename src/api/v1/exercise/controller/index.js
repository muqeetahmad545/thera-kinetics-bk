import Exercise from '../models/index.js';

const exerciseController = {
   
  createExercise : async (req, res) => {
    const exerciseData = req.body; 
    try {
      const newExercise = new Exercise(exerciseData); 
      await newExercise.save();
      res.status(201).json({
        success: true,
        data: newExercise,
        message: 'Eercise Model created successfully'
      });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  },

  getExercise: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10; 
      const skip = (page - 1) * limit; 
      const allExercise = await Exercise.find() 
        .skip(skip)
        .limit(limit);
      const totalErercise = await Exercise.countDocuments();
      res.json({
        success: true,
        data: allExercise,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalErercise / limit), 
          totalRecords: totalErercise,
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  },
  
  updateExercise: async (req, res) => {
    const exerciseID  = req.query.exerciseID; 

    const updatedData = req.body;      
    try {
      const exercise = await Exercise.findByIdAndUpdate(exerciseID, updatedData, { new: true });
      if (!exercise) {
        return res.status(404).json({ message: "Erercise not found" });
      }
      return res.status(200).json({
        message: "Erercise Data updated successfully",
        exercise
      });
    } catch (error) {
      console.error("Error updating Erercise:", error);
      return res.status(500).json({ message: "Error updating Erercise", error: error.message });
    }
  },
  
  
};

export default exerciseController;
