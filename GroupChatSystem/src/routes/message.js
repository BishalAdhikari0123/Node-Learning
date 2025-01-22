import express from 'express';
import messageController from '../controller/messageController.js';
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/messages')

    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
      },
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const fileType = file.mimetype.split("/")[0];
        if (fileType == 'image'||'application') {
            cb(null, true);
        } else {
            cb(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 10 // 10 MB
    }
})

const messageRouter = express.Router();

messageRouter.post('/group/:groupId/messages', upload.single('file'), messageController.sendMessage);

messageRouter.put('/messages/:messageId/edit', messageController.editMessage);

messageRouter.delete('/group/:groupId/messages/:messageId/delete', messageController.deleteMessage);

messageRouter.get("/group/:groupId/messages", messageController.getMessages);


export default messageRouter;
