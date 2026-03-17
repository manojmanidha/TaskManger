const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const taskController = require("../controllers/task.controller");

router.post("/", upload.single("file"), taskController.createTask);
router.get("/", taskController.getTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.get("/file/:id", taskController.getFile);

module.exports = router;