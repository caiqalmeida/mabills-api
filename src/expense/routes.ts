import { Router } from "express";
import controller from "./controller";

const router = Router();

router.get("/", controller.getExpenses);
router.post("/", controller.addExpense);
router.get("/:id", controller.getExpenseById);
router.put("/:id", controller.updateExpense);
router.delete("/:id", controller.deleteExpense);

export default router;
