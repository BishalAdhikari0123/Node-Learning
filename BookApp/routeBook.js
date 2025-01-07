import { Router } from "express";
import { getBookMetadata,editBookMetadata,Book } from "./modelBook.js";
import { editBookValid,bookValid } from "./validationBook.js";
import mongoose from "mongoose";
import validate from "./middlewareValidation.js";


const bookRouter = Router();


//get book metadata
bookRouter.get("/",async function(req,res) {
    try{

        const bookMeta = (await getBookMetadata()).toObject();
        const books = await Book.find({});
        // console.log("Server running on port : ", process.env.PORT)
        return res.json({ ...bookMeta, _id: undefined, __v: undefined, date: new Date().toISOString(), Book: books} )

    }
    catch(e){
        return res.status(500).json({Error:e.message})
    }
    
})

bookRouter.put("/",validate(editBookValid), async function (req, res) {
    try {
        const { source, updatedBy } = req.body;
        let newData = await editBookMetadata({source, updatedBy});
        console.log("successfully updated")
        return res.status(200).json({ metadata: newData });
    } catch (e) {
        console.log("Validation error")
        return res.status(500).json({ error: e.message });
    }
});
//add new book
bookRouter.post("/", validate(bookValid.newBook), async function (req, res) {
    try {
        const { title,
                author,
                publishedYear,
                genre,
                rating } = req.body;
        const newData = await Book.create({title,
            author,
            publishedYear,
            genre,
            rating });
            console.log("Book added!!")
        return res.status(201).json({ Book: newData })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
})

const singleBookRouter= Router();

bookRouter.use("/:bookID",
    validate(bookValid.singleBook),
    async function (req, res, next) {
        try {

            const { bookID } = req.params;
            const bookData = await Book.findOne({ _id: new mongoose.Types.ObjectId(bookID) });

            if (bookData) {
                req.bookData = bookData;
                next();
            } else {
                throw new Error("Book not found by id: " + bookID)
            }
        } catch (e) {
            console.log("book validation error")
            return res.status(400).send({ error: e.message })
        }
    },
    singleBookRouter);
//get single book
singleBookRouter.get("/", function (req, res) {
    return res.send({ Book: req.bookData })
})


singleBookRouter.put("/", validate(bookValid.addNew), async function (req, res) {
    try {
        const { title,
            author,
            publishedYear,
            genre,
            rating  } = req.body;
        req.bookData.title = title
        req.bookData.author = author
        
        req.bookData.publishedYear = publishedYear
        req.bookData.genre = genre
        req.bookData.rating = rating
        
        await req.bookData.save();
        return res.status(200).json({ Book: req.bookData })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
})



singleBookRouter.delete("/", async function (req, res) {
    try {
        await req.bookData.deleteOne();
        return res.status(200).json({ message: "Book Deleted." })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
})


export default bookRouter;




