import { Company } from '../entity/company.entity';

export const getCompanyByAccountId = async (accountId: number) => {
  const company = await Company.findOne({
    where: {
      account: {
        account_id: accountId,
      },
    },
    relations: ['account'],
  });

  return company;
};

export const getCompanyById = async (companyId: number) => {
  const company = await Company.createQueryBuilder('company')
    .leftJoinAndSelect('company.account', 'account')
    .leftJoinAndSelect('company.ratingStatistics', 'ratingStatistics')
    .where('company.company_id = :companyId', { companyId })
    .select([
      'company',
      'account.email',
      'ratingStatistics.rating',
      'ratingStatistics.count',
    ])
    .getOne();

  return company;
};

export const fetchAllCompanies = async (page: number, limit: number) => {
  const [companies, totalCompanies] = await Company.createQueryBuilder(
    'company'
  )
    .leftJoinAndSelect('company.account', 'account')
    .leftJoinAndSelect('company.ratingStatistics', 'ratingStatistics')
    .select([
      'company',
      'account.email',
      'ratingStatistics.rating',
      'ratingStatistics.count',
    ])
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  return { companies, totalCompanies };
};
