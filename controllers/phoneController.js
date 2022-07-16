const express = require("express");
const app = express.Router();
const phoneModel = require("../models/phoneModel");
let ObjectId = require("mongoose").Types.ObjectId;

// localhost:8000/mobile/
app.get("/", (req, res) => {
  phoneModel.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Data: " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});
// localhost:8000/mobile/
app.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No Record with given id: ${req.params.id}`);

  phoneModel.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Data: " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});
// localhost:8000/mobile/
// post

app.post("/", (req, res) => {
  const newPhoneData = new phoneModel({
    brand: req.body.brand,
    phone_name: req.body.phone_name,
    phone_img_url: req.body.phone_img_url,
    phone_color: req.body.phone_color,
    phone_price: req.body.phone_price,
  });
  newPhoneData.save((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in Adding Data: " + JSON.stringify(err, undefined, 2));
    }
  });
});

// put
app.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No Record with given id: ${req.params.id}`);
  const PhoneData = {
    brand: req.body.brand,
    phone_name: req.body.phone_name,
    phone_img_url: req.body.phone_img_url,
    phone_color: req.body.phone_color,
    phone_price: req.body.phone_price,
  };
  phoneModel.findByIdAndUpdate(
    req.params.id,
    { $set: PhoneData },
    { new: true },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log(
          "Error in updating Data: " + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

//delete
app.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No Record with given id: ${req.params.id}`);
  phoneModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Deleting the Data: " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});
module.exports = app;
