import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import Inventory from "../models/Inventory";

export async function getAllInventoryItems(req: Request, res: Response) {
  const inventory = await Inventory.find({
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.OK).json({ inventory, count: inventory.length });
}

export async function createInventoryItem(req: Request, res: Response) {
  req.body.createdBy = req.user.userId;
  const inventory = await Inventory.create(req.body);
  res.status(StatusCodes.CREATED).json({ inventory });
}

export async function getInventoryItem(req: Request, res: Response) {
  const {
    user: { userId },
    params: { id: inventoryItemId },
  } = req;

  const inventoryItem = await Inventory.findOne({
    _id: inventoryItemId,
    createdBy: userId,
  });

  if (!inventoryItem) {
    throw new NotFoundError(`No job With ID ${inventoryItemId}`);
  }

  res.status(StatusCodes.OK).json({ inventoryItem });
}

export async function updateInventoryItem(req: Request, res: Response) {
  const {
    body: { name, category, weight, weightUnit, quantity },
    user: { userId },
    params: { id: inventoryItemId },
  } = req;

  if (
    name === "" ||
    category === "" ||
    weight === "" ||
    weightUnit === "" ||
    quantity === ""
  ) {
    throw new BadRequestError("Fields Cannot Be Empty");
  }

  const inventoryItem = await Inventory.findByIdAndUpdate(
    { _id: inventoryItemId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!inventoryItem) {
    throw new NotFoundError(`No job With ID ${inventoryItemId}`);
  }

  res.status(StatusCodes.OK).json({ inventoryItem });
}

export async function deleteInventoryItem(req: Request, res: Response) {
  const {
    user: { userId },
    params: { id: inventoryItemId },
  } = req;

  const inventory = await Inventory.findByIdAndRemove({
    _id: inventoryItemId,
    createdBy: userId,
  });

  if (!inventory) {
    throw new NotFoundError(`No job With ID ${inventoryItemId}`);
  }

  res.status(StatusCodes.OK).send("Inventory Item Deleted");
}
