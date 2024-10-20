import { Request, Response } from 'express';
import { getCompanyById } from '../services/company.service';

export const getCompanyDetails = async (req: Request, res: Response) => {
  const companyId = parseInt(req.params.id, 10);

  try {
    const company = await getCompanyById(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Công ty không tồn tại' });
    }

    return res.status(200).json(company);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: 'Đã xảy ra lỗi', error: error.message });
    }
    return res.status(500).json({ message: 'Đã xảy ra lỗi không xác định' });
  }
};
