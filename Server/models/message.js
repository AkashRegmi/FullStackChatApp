import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    room: {
      type: String,
    },
    message: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
    },
  },
  { timestamps: true },
);
const Message = mongoose.model("Message", messageSchema);
export default Message;
