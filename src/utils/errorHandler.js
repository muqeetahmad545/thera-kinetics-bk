const handleError = (err, req, res, next) => {
    // Duplicate key error
    if (err?.code === 11000) {
      return res
        .status(400)
        .json({ error: "Duplicate key error: Email already exists" });
    }
  
    // Validation errors
    if (err?.name === "ValidationError") {
      const validationErrors = Object.values(err.errors).map(
        (error) => error?.message
      );
      return res
        .status(400)
        .json({ error: "Validation error", details: validationErrors });
    }
  
    // Resource not found
    if (err?.status === 404) {
      return res
        .status(404)
        .json({ error: err?.message || "Resource not found" });
    }
  
    if (err?.status === 401) {
      return res
        .status(401)
        .json({
          error: err?.message || "Unauthorized access: Please authenticate",
        });
    }
  
    // Default to server error
    res.status(err?.status || 500).json({
      error: err?.message || "An internal server error occurred",
    });
  };
  
 export default handleError;
