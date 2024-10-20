import { User } from '../entity/user.entity';

export const getUserByAccountId = async (accountId: number) => {
  const user = await User.findOne({
    where: {
      account: {
        account_id: accountId,
      },
    },
    relations: ['account'],
  });

  return user;
};
