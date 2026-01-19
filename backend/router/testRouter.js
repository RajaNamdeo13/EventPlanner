import express from "express";

const router = express.Router();

router.post("/test", (req, res) => {
  res.status(200).json({
    success: true,
    body: req.body
  });
});

export default router;
