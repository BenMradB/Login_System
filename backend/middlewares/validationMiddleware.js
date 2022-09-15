module.exports.validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        return next();
    } catch (err) {
        return res.status(404).json({
            status: 'error',
            error: err.message
        });
    }
}

