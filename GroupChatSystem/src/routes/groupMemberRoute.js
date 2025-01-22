import express from "express";
import groupMemberController from "../controller/groupMemberController.js";
import validate from "../middleware/validate.js";
import groupMemberValidator from "../validation/groupMemberValidator.js";
import getUserFromAuthToken from "../middleware/getUserFromAuthToken.js";

const groupMemberRouter = express.Router();
//add member to private groups
groupMemberRouter.post(
  "/members/:groupID",
  getUserFromAuthToken,
  validate({ body: groupMemberValidator.validateAddGroupMember }),
  groupMemberController.addMemberToPrivateGroup
);
//remove member
groupMemberRouter.delete(
    "/:groupID/members",
    getUserFromAuthToken,
    validate({ body: groupMemberValidator.validateRemoveGroupMember }),
    groupMemberController.removeMemberFromPrivateGroup
  );
  groupMemberRouter.get(
    "/mine", 
    getUserFromAuthToken,
    groupMemberController.getUserJoinedGroups
  );
  //join public group
  groupMemberRouter.post("/:groupID/join",getUserFromAuthToken,groupMemberController.joinPublicGroup);
  
export default groupMemberRouter;
