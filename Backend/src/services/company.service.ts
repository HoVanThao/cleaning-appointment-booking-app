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
