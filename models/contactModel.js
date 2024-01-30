import { model, Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 2,
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
    },
    phone: {
      type: String,
      unique: [true, "Phone already exists"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Contact = model("Contact", contactSchema);

export { Contact };
