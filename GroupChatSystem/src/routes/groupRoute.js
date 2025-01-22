import { Router } from "express";
import validate from "../middleware/validate.js";
import groupController from "../controller/groupController.js";
import groupValidation from "../validation/groupValidator.js";
import getUserFromAuthToken from "../middleware/getUserFromAuthToken.js"

const groupRouter = Router();

groupRouter.post(
  "/groups",getUserFromAuthToken, 
  validate({
    body: groupValidation.validateCreateGroup,
  }),
  groupController.createGroup
);

groupRouter.get(
  "/groups",getUserFromAuthToken,
  groupController.getAllPublicGroups
);

const singleGroupRouter = Router();
singleGroupRouter.put(
  "/:groupId",
  getUserFromAuthToken,
  validate({
    body: groupValidation.validateCreateGroup,
  }),
  groupController.editGroup
);

singleGroupRouter.delete(
  "/:groupId",
  getUserFromAuthToken,
groupController.deleteGroup
);
export {groupRouter,singleGroupRouter};
