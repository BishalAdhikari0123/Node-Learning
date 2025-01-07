const validate = function (validationSchemas = {}) {
    return function (req, res, next) {
        const { body, params, query, headers } = validationSchemas;

        let validationResult= { error: null };

        if (body) {
            validationResult = body.validate(req.body, { abortEarly: false });
        }
        if (params) {
            validationResult = params.validate(req.params, { abortEarly: false });
        }
        if (query) {
            validationResult = query.validate(req.query, { abortEarly: false });
        }
        if (headers) {
            validationResult = headers.validate(req.headers, { abortEarly: false });
        }
        if (validationResult.error) {
            return res.status(400).send({ error: validationResult.error.message })
        } 
        return next();
    }
}



export default validate;