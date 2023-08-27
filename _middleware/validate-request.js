async function validateRequest(req, next, schema, type = 'body') {
    const options = {
        abortEarly: false, 
        allowUnknown: true, 
        stripUnknown: true
    };
    const { error, value } = schema.validate(req[type], options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req[type] = value;
        next();
    }
}


module.exports = { validateRequest };