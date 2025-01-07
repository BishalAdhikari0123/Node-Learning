//tested getBookMetadata and editBookMetadata successfully


import { getBookMetadata, editBookMetadata } from "./modelBook.js";

import connectToDB from "./connect.js"

connectToDB().then(function (connectMessage) {
    console.log(connectMessage)

    return editBookMetadata("ktm","bishal").then(m => console.log(m)).catch(e => console.error(e))
}).catch(function (err) {
    console.error(err)
})