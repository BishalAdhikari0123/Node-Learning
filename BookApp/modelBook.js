
import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const bookMetadataSchema = new Schema({
    source:{
        type : String,
        default : ""
    },
    updatedBy :{
        type : String,
        default : ""
    }
})
const BookMetadata = model("BookMetadata", bookMetadataSchema);

async function getBookMetadata() {
    let previousData = await BookMetadata.findOne({})
    if(!previousData){
        previousData = await BookMetadata.create({});
        console.log("New Metadata Created!!!");
    }
    return previousData
}

async function editBookMetadata({ source, updatedBy} ) {
    let previousData = (await getBookMetadata());

    previousData.source = source;
    previousData.updatedBy = updatedBy;
    
    await previousData.save();
    return previousData;
    
}

const bookSchema = new Schema({
    title:{
        type : String,
        default:"",
        required : true,
    },
    author:{
        type : String,
        default:"",
        required : true,
    },
    publishedYear:{
        type : Date,
        default:"",
        required : true,
    },
    genre:{
        type : String,
        default:"",
        required : true,
    },
    rating:{
        type : String,
        default:"",
        required : true,
    }
},{timestamps:true})

const Book = model("Book",bookSchema);



export {getBookMetadata, editBookMetadata,BookMetadata,Book};