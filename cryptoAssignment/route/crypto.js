// import { Router } from "express";
// import CurrencyMetadata from "../model/crypto.js";
// import { addCurrencySchema } from "../validation/validate.js";
// import mongoose from "mongoose";

// const currencyRouter = Router();

// currencyRouter.get(
//   "/",
//   function (req, res, next) {
//     console.log("Fetching currencies...");
//     setTimeout(() => {
//       next();
//     }, 1000);
//   },
//   async function (req, res) {
//     try {
//       const currencies = await CurrencyMetadata.find({});
//       return res.json(currencies);
//     } catch (err) {
//       return res.status(500).json({ error: err.message });
//     }
//   }
// );

// // Add new currency metadata
// currencyRouter.post("/", async function (req, res) {
//   try {
//     const validationResult = addCurrencySchema.validate(req.body, { abortEarly: false });
//     if (validationResult.error) {
//       return res.status(400).json({ error: validationResult.error.details });
//     }

//     const newMetadata = await CurrencyMetadata.create(validationResult.value);
//     return res.status(201).json({ metadata: newMetadata });
//   } catch (err) {
//     return res.status(400).json({ error: err.message });
//   }
// });

// const singleCurrencyRouter = Router();

// currencyRouter.use(
//   "/:metadataId",
//   async function (req, res, next) {
//     try {
//       const metadataId = req.params.metadataId;
//       if (!metadataId) throw new Error("Metadata ID not provided.");

//       const metadata = await CurrencyMetadata.findOne({ _id: new mongoose.Types.ObjectId(metadataId) });
//       if (!metadata) {
//         throw new Error("Metadata not found with the provided ID.");
//       }

//       req.metadata = metadata; 
//       next();
//     } catch (err) {
//       return res.status(400).json({ error: err.message });
//     }
//   },
//   singleCurrencyRouter
// );

// // Get single currency metadata
// singleCurrencyRouter.get("/", function (req, res) {
//   return res.json(req.metadata);
// });

// // Delete single currency metadata
// singleCurrencyRouter.delete("/", async function (req, res) {
//   try {
//     await req.metadata.deleteOne();
//     return res.json({ message: "Metadata deleted successfully." });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// });

// // Update single currency metadata
// singleCurrencyRouter.put("/", async function (req, res) {
//   try {
//     const validationResult = addCurrencySchema.validate(req.body, { abortEarly: false });
//     if (validationResult.error) {
//       return res.status(400).json({ error: validationResult.error.details });
//     }

//     const updatedMetadata = Object.assign(req.metadata, validationResult.value);
//     await updatedMetadata.save();

//     return res.status(200).json({ metadata: updatedMetadata });
//   } catch (err) {
//     return res.status(400).json({ error: err.message });
//   }
// });

// export { currencyRouter };
import { Router } from "express";
import CurrencyMetadata from "../model/crypto.js";
import { addCurrencySchema, metadataSchema, singleCurrencySchema } from "../validation/validate.js";
import mongoose from "mongoose";

const currencyRouter = Router();

currencyRouter.get(
  "/",
  function (req, res, next) {
    console.log("Fetching currencies...");
    setTimeout(() => {
      next();
    }, 1000);
  },
  async function (req, res) {
    try {
      const currencies = await CurrencyMetadata.find({});
      return res.json(currencies);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// Create new metadata with or without currencies
currencyRouter.post("/", async function (req, res) {
  try { 
    const validationResult = addCurrencySchema.validate(req.body, { abortEarly: false });
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details });
    }

    const newMetadata = await CurrencyMetadata.create(validationResult.value);
    return res.status(201).json({ metadata: newMetadata });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Add metadata without currencies
currencyRouter.post("/metadata", async function (req, res) {
  try {
    const validationResult = metadataSchema.validate(req.body, { abortEarly: false });
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details });
    }

    const newMetadata = await CurrencyMetadata.create({
      ...validationResult.value,
      currencies: [], 
    });

    return res.status(201).json({ metadata: newMetadata });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Middleware for handling single metadata by ID
const singleCurrencyRouter = Router();

currencyRouter.use(
  "/:metadataId",
  async function (req, res, next) {
    try {
      const metadataId = req.params.metadataId;
      if (!metadataId) throw new Error("Metadata ID not provided.");

      const metadata = await CurrencyMetadata.findById(metadataId);
      if (!metadata) {
        throw new Error("Metadata not found with the provided ID.");
      }

      req.metadata = metadata; // Attach metadata to request object
      next();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
  singleCurrencyRouter
);

// Get single metadata
singleCurrencyRouter.get("/", function (req, res) {
  return res.json(req.metadata);
});

// Delete metadata
singleCurrencyRouter.delete("/", async function (req, res) {
  try {
    await req.metadata.deleteOne();
    return res.json({ message: "Metadata deleted successfully." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update metadata
singleCurrencyRouter.put("/", async function (req, res) {
  try {
    const validationResult = addCurrencySchema.validate(req.body, { abortEarly: false });
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details });
    }

    const updatedMetadata = Object.assign(req.metadata, validationResult.value);
    await updatedMetadata.save();

    return res.status(200).json({ metadata: updatedMetadata });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
currencyRouter.post("/:metadataId/currency", async function (req, res) {
  try {
    const { metadataId } = req.params;

    // Validate the metadataId
    if (!mongoose.Types.ObjectId.isValid(metadataId)) {
      return res.status(400).json({ error: "Invalid metadata ID." });
    }

    // Find the metadata by ID
    const metadata = await CurrencyMetadata.findById(metadataId);
    if (!metadata) {
      return res.status(404).json({ error: "Metadata not found." });
    }

    // Validate currency data
    const { name, exchangeRate, foundIn } = req.body;
    if (!name || !exchangeRate || !foundIn) {
      return res.status(400).json({ error: "Missing required currency fields." });
    }

    // Add the new currency
    const newCurrency = { name, exchangeRate, foundIn };
    metadata.currencies.push(newCurrency);

    // Save the updated metadata
    await metadata.save();

    return res.status(201).json({ metadata });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  
});

// Delete a specific currency from a specific metadata
currencyRouter.delete("/:metadataId/currency/:currencyId", async function (req, res) {
  try {
    const { metadataId, currencyId } = req.params;

    // Validate metadata ID and currency ID
    if (!mongoose.Types.ObjectId.isValid(metadataId) || !mongoose.Types.ObjectId.isValid(currencyId)) {
      return res.status(400).json({ error: "Invalid metadata or currency ID." });
    }

    // Find the metadata by ID
    const metadata = await CurrencyMetadata.findById(metadataId);
    if (!metadata) {
      return res.status(404).json({ error: "Metadata not found." });
    }

    // Find the index of the currency to remove
    const currencyIndex = metadata.currencies.findIndex(
      (currency) => currency._id.toString() === currencyId
    );

    if (currencyIndex === -1) {
      return res.status(404).json({ error: "Currency not found in the provided metadata." });
    }

    // Remove the currency from the metadata's currencies array
    metadata.currencies.splice(currencyIndex, 1);

    // Save the updated metadata
    await metadata.save();

    return res.status(200).json({ message: "Currency deleted successfully." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


export { currencyRouter };
