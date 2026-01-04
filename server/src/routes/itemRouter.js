var express = require('express');
var itemRouter = express.Router();

// Required store route
var Item = require('../models/Item');

// ✅ ADD (Create)
itemRouter.route('/add/post').post(function (req, res) {
  console.log("REQ BODY:", req.body);

  // Frontend bu projectdə adətən { item: "text" } göndərir
  if (!req.body || !req.body.item || String(req.body.item).trim() === "") {
    return res.status(400).json({ message: "Field 'item' is required" });
  }

  var item = new Item({
    item: req.body.item
  });

  item.save()
    .then(() => {
      res.json('Item added successfully');
    })
    .catch((err) => {
      console.error("SAVE ERROR:", err);
      return res.status(400).json({
        message: "unable to save to database",
        error: err.message
      });
    });
});


// ✅ GET (List)
itemRouter.route('/').get(function (req, res) {
  Item.find(function (err, items) {
    if (err) {
      console.error("FIND ERROR:", err);
      return res.status(500).json({ message: "failed to fetch items", error: err.message });
    }
    res.json(items);
  });
});


// ✅ GET (Edit one)
itemRouter.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Item.findById(id, function (err, item) {
    if (err) {
      console.error("FIND BY ID ERROR:", err);
      return res.status(400).json({ message: "invalid id", error: err.message });
    }
    if (!item) {
      return res.status(404).json({ message: "item not found" });
    }
    res.json(item);
  });
});


// ✅ UPDATE
itemRouter.route('/update/:id').post(function (req, res) {
  if (!req.body || !req.body.item || String(req.body.item).trim() === "") {
    return res.status(400).json({ message: "Field 'item' is required" });
  }

  Item.findById(req.params.id, function (err, item) {
    if (err) {
      console.error("UPDATE FIND ERROR:", err);
      return res.status(400).json({ message: "invalid id", error: err.message });
    }
    if (!item) {
      return res.status(404).json({ message: "could not load Document" });
    }

    item.item = req.body.item;

    item.save()
      .then(() => {
        res.json('Update complete');
      })
      .catch((err) => {
        console.error("UPDATE SAVE ERROR:", err);
        return res.status(400).json({
          message: "unable to update the database",
          error: err.message
        });
      });
  });
});


// ✅ DELETE
itemRouter.route('/delete/:id').get(function (req, res) {
  Item.findByIdAndRemove({ _id: req.params.id }, function (err, item) {
    if (err) {
      console.error("DELETE ERROR:", err);
      return res.status(400).json({ message: "delete failed", error: err.message });
    }
    if (!item) {
      return res.status(404).json({ message: "item not found" });
    }
    res.json('Successfully removed');
  });
});

module.exports = itemRouter;
