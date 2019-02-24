export default ({ res, error }) =>
    res.status(401).json({
        message: error ? error.message : 'Unauthorized'
    });
