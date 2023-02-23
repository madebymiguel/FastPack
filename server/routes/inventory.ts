import { Router } from "express";
import {
  getAllInventoryItems,
  createInventoryItem,
  getInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../controllers/inventory";

const router = Router();

router.route("/").post(createInventoryItem).get(getAllInventoryItems);

router
  .route("/:id")
  .get(getInventoryItem)
  .patch(updateInventoryItem)
  .delete(deleteInventoryItem);

export default router;
