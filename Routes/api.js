const router = require("express").Router();

const { shortUrlPost, redirectGet } = require("../Controllers/apiControllers");

router.post("/short", shortUrlPost);
router.get("/:urlCode", redirectGet);

module.exports = router;
