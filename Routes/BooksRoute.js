const express = require("express");
const BooksControllr = require("../Controllers/BooksController");

const router = express.Router();

router.get("/Allbooks", BooksControllr.AllBooks);
router.get("/BookwithID/:BId", BooksControllr.BookwithID);
router.post("/AddBooks", BooksControllr.AddBooks);
router.put("/Update/:Id", BooksControllr.UpdateBookbyID);
router.delete("/Delete/:Id", BooksControllr.Delete);

module.exports = router;
