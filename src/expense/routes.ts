import { Router } from "express";
import multer from "multer";

import controller from "./controller";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.get("/", controller.getExpenses);
router.post("/", controller.addExpense);
router.get("/:id", controller.getExpenseById);
router.put("/:id", controller.updateExpense);
router.delete("/:id", controller.deleteExpense);

router.post("/upload", upload.single("csv"), controller.addExpenseByFile);

export default router;
