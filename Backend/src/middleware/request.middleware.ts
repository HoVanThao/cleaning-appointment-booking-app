import { Request, Response, NextFunction } from 'express';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    user_id,
    company_id,
    name,
    phone,
    address,
    request_date,
    timejob,
    request,
  } = req.body;

  if (
    !user_id ||
    !company_id ||
    !name ||
    !phone ||
    !address ||
    !request_date ||
    !timejob ||
    !request
  ) {
    return res.status(400).json({ message: 'All fields must be provided' });
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const timeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

  if (!dateRegex.test(request_date)) {
    return res
      .status(400)
      .json({ message: 'Invalid request_date format. Use YYYY-MM-DD.' });
  }

  if (!timeRegex.test(timejob)) {
    return res
      .status(400)
      .json({ message: 'Invalid timejob format. Use YYYY-MM-DD HH:mm:ss.' });
  }

  const date = new Date(request_date);
  if (isNaN(date.getTime()) || date < new Date()) {
    return res.status(400).json({ message: 'Invalid or past request_date.' });
  }

  next();
};

export function validateUpdateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    name,
    phone,
    address,
    request_date,
    timejob,
    status,
    price,
    request,
  } = req.body;

  // Kiểm tra nếu có user_id hoặc company_id được cung cấp
  if (req.body.user_id || req.body.company_id) {
    if (!req.body.user_id || !req.body.company_id) {
      return res.status(400).json({
        message: 'User and Company IDs must be provided for creation',
      });
    }
  }

  // Kiểm tra ít nhất một trường cần thiết được cung cấp
  const atLeastOneFieldProvided = [
    name,
    phone,
    address,
    request_date,
    timejob,
    status,
    price,
    request,
  ].some(field => field !== undefined && field !== null && field !== '');

  if (!atLeastOneFieldProvided) {
    return res
      .status(400)
      .json({ message: 'At least one field must be provided for update' });
  }

  next();
}
