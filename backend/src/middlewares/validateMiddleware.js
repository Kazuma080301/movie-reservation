const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body); // Will throw error if invalid
            next();
        } catch (error) {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.errors.map((e) => e.message)
            });
        }
    };
};

module.exports = { validateSchema };
