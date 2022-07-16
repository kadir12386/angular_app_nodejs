const mongoose = require("mongoose");

const PhoneSchema = new mongoose.Schema(
  {
    brand: { type: String },
    phone_name: { type: String },
    phone_img_url: { type: String },
    phone_color: { type: String },
    phone_price: { type: String },
  },
  { timestamps: true }
);

const phoneModel = mongoose.model("phoneDetail", PhoneSchema);

module.exports = phoneModel;
