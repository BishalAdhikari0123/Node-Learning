import { Schema, model } from "mongoose";

// const cryptoSchema1 = new Schema ({

//   source:{
//     type: String,
//     required: true,
//   },

//   updatedBy:{
//     type: String,
//     required: true,
//   },

//   name:{
//     type: String,
//     required: true,
//   },

//   exchangeRate: {
//     type: Number,
//     required: true,
//   },

//   foundIn: {
//     type: Number,
//     required: true,
//   },

 
// },{ timeStamps: true})

// const Crypto =model("Crypto", cryptoSchema1 );

const currencySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    exchangeRate: {
        type: Number,
        required: true,
    },
    foundIn: {
        type: String,
        required: true,
    }
}, { timestamps: true });
const currencyMetadataSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    source: {
        type: String,
        default: "coinbase",
    },
    updatedBy: {
        type: String,
        default: "Bishal Adhikari",
    },
    currencies: {
        type: [currencySchema],
        required: true,
    }
}, { timestamps: true });

const currencyMetadata = model("CurrencyMetadata", currencyMetadataSchema);

async function addCrypto({date,source,updatedBy,currencies}) {
  return Crypto.create({date,source,updatedBy,currencies})

}

export { addCrypto};
export default currencyMetadata;