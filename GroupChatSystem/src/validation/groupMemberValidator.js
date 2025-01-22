import Joi from "joi";

const validateAddGroupMember = Joi.object({
  userId: Joi.string().required().label("User ID")
  
});

const validateRemoveGroupMember = Joi.object({
  userId: Joi.string().required().label("User ID"),
  })


const validateFetchGroupMembers = Joi.object({
  groupId: Joi.string().required().label("Group ID"),
  })

const groupMemberValidator = {
  validateAddGroupMember,
  validateRemoveGroupMember,
  validateFetchGroupMembers,
};

export default groupMemberValidator;
