import { Request, Response } from 'express';
import { getCompanyById, fetchAllCompanies } from '../services/company.service';

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

export const getAllCompanies = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const location = req.query.location as string || '';
  const name = req.query.name as string || '';

  try {
    const { companies, totalCompanies } = await fetchAllCompanies(page, limit, location, name);
    const totalPages = Math.ceil(totalCompanies / limit);

    return res.status(200).json({
      companies,  // Trả về danh sách công ty kèm theo completedRequestsCount
      totalCompanies,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};
