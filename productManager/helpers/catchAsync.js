const catchAsync = function (requestHandler) {
    return async function (req, res, next) {
        try {
            await requestHandler(req, res, next);
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }
}

export { catchAsync }