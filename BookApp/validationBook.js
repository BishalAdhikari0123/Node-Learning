import Joi from "joi";

const editBookValid = {
    body:Joi.object().keys({
        source:Joi.string().required(),
        updatedBy:Joi.string().required()
    })
}
const bookValid = {
    newBook:{
    body:Joi.object().keys({
        title:Joi.string().required(),
        author:Joi.string().required(),
        publishedYear:Joi.date().required(),
        genre:Joi.string().required(),
        rating:Joi.number().required()
    })},
    singleBook: {
        params: Joi.object().keys({ bookID: Joi.string().length(24).required(), })
    }
}

export {editBookValid,bookValid};