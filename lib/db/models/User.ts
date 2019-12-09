import { model, Schema } from "mongoose";

const validRoles = {
  values: ["ADMIN_ROLE", "SUPERVISOR_ROLE", "USER_ROLE"],
  message: "{VALUE} not a valid role"
};

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "the name is mandatory"]
  },
  lastName: {
    type: String,
    required: [true, "the lastName is mandatory"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "the email is mandatory"]
  },
  jobRole: {
    type: String,
    required: [true, "the jobRole is mandatory"]
  },
  dni: {
    type: String,
    required: [true, "the dni is mandatory"]
  },
  country: {
    type: String,
    required: [true, "the country is mandatory"]
  },
  society: {
    type: String,
    required: [true, "the society is mandatory"]

  },
  date: {
    type: String,
    required: [true, 'the date is mandatory']
  },
  state: {
    type: Boolean,
    default: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: validRoles,
    default: "USER_ROLE"
  }
});

export default model("User", userSchema);
