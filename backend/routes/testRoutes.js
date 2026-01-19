import express from "express";

const router = express.Router();

router.post("/test", (req, res) => {
  res.json({
    success: true,
    body: req.body
  });
});

export default router;
