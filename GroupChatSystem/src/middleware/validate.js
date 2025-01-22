const validate = function (validationSchemas = {}) {
    return function (req, res, next) {
        const { body, params, query, headers } = validationSchemas;

        let errors = [];

        if (body) {
            const bodyValidation = body.validate(req.body, { abortEarly: false });
            if (bodyValidation.error) {
                errors.push(...bodyValidation.error.details.map(detail => detail.message));
            }
        }
        if (params) {
            const paramsValidation = params.validate(req.params, { abortEarly: false });
            if (paramsValidation.error) {
                errors.push(...paramsValidation.error.details.map(detail => detail.message));
            }
        }
        if (query) {
            const queryValidation = query.validate(req.query, { abortEarly: false });
            if (queryValidation.error) {
                errors.push(...queryValidation.error.details.map(detail => detail.message));
            }
        }
        if (headers) {
            const headersValidation = headers.validate(req.headers, { abortEarly: false });
            if (headersValidation.error) {
                errors.push(...headersValidation.error.details.map(detail => detail.message));
            }
        }

        if (errors.length > 0) {
            return res.status(400).send({ error: errors.join(", ") });
        }
        return next();
    };
};

export default validate;
