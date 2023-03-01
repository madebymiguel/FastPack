import { Router } from "express";
import {
  getAllPackLists,
  createPackListItem,
  getPackListItem,
  updatePackListItem,
  deletePackListItem,
} from "../controllers/packList";

const router = Router();

router.route("/").get(getAllPackLists);

router.route("/new").post(createPackListItem);

router
  .route("/:id")
  .get(getPackListItem)
  .patch(updatePackListItem)
  .delete(deletePackListItem);

export default router;
