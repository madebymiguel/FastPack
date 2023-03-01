import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
import PackList from "../models/PackList";

export async function getAllPackLists(req: Request, res: Response) {
  const packLists = await PackList.find({
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.OK).json({ packLists, count: packLists.length });
}

export async function createPackListItem(req: Request, res: Response) {
  req.body.createdBy = req.user.userId;
  const packList = await PackList.create(req.body);
  res.status(StatusCodes.CREATED).json({ packList });
}

export async function getPackListItem(req: Request, res: Response) {
  const {
    user: { userId },
    params: { id: packListItemId },
  } = req;

  const packListItem = await PackList.findOne({
    _id: packListItemId,
    createdBy: userId,
  });

  if (!packListItem) {
    throw new NotFoundError(`No job With ID ${packListItemId}`);
  }

  res.status(StatusCodes.OK).json({ packListItem });
}

export async function updatePackListItem(req: Request, res: Response) {
  const {
    user: { userId },
    params: { id: packListItemId },
  } = req;

  const packListItem = await PackList.findByIdAndUpdate(
    { _id: packListItemId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!packListItem) {
    throw new NotFoundError(`No job With ID ${packListItemId}`);
  }

  res.status(StatusCodes.OK).json({ packListItem });
}

export async function deletePackListItem(req: Request, res: Response) {
  const {
    user: { userId },
    params: { id: packListItemId },
  } = req;

  const packListItem = await PackList.findByIdAndRemove({
    _id: packListItemId,
    createdBy: userId,
  });

  if (!packListItem) {
    throw new NotFoundError(`No job With ID ${packListItemId}`);
  }

  res.status(StatusCodes.OK).send("Inventory Item Deleted");
}
