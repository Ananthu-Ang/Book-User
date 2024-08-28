const BModel = require("../models/BookM");
module.exports.AllBooks = async (req, res) => {
  try {
    const Allbook = await BModel.find();
    res.send({ AllBooks: Allbook });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};
module.exports.AddBooks = async (req, res) => {
  try {
    const isExist = await BModel.findOne({ title: req.body.title });
    if (!isExist) {
      const Addbook = await BModel(req.body);
      await Addbook.save();
      res.status(200).json({ message: "Book Added", Addbook });
    } else {
      res.status(409).json({ message: "Already Exist" });
    }
  } catch (error) {
    res.status(404).json({ message: "Error Detected", Error: error.message });
  }
};

module.exports.BookwithID = async (req, res) => {
  try {
    const SpecificBook = await BModel.find({ id: req.params.BId });
    if (SpecificBook) res.send({ SpeciBook: SpecificBook });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports.UpdateBookbyID = async (req, res) => {
  try {
    const updatedBook = await BModel.findOneAndUpdate(
      { id: req.params.Id },
      { $set: { author: req.body.author } },
      { new: true }
    );
    res.status(200).json({ Message: "Updated", updatedBook });
  } catch (error) {
    res.status(404).json({ message: "Cannot Update", Error: error });
  }
};
module.exports.Delete = async (req, res) => {
  try {
    const Delete = await BModel.findOneAndDelete({ id: req.params.Id });
    res.status(200).json({ message: "Deleted", Delete });
  } catch (error) {
    res.status(404).json({ message: "Cannot Delete", Error: error });
  }
};
