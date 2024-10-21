import { Account } from '../entity/account.entity';
import { User } from '../entity/user.entity';
import { AccountRoleEnum } from '../enums/account.enum';
import { UserStatusEnum } from '../enums/userStatus.enum';
import { AppDataSource } from '../config/data-source';
import bcrypt from 'bcrypt';

export async function seedCustomers() {
  // Thêm từ khóa export ở đây
  const accountRepository = AppDataSource.getRepository(Account);
  const userRepository = AppDataSource.getRepository(User); // Khởi tạo userRepository

  for (let i = 1; i <= 10; i++) {
    // Tạo dữ liệu cho bảng Account
    const account = new Account();
    account.email = `customer${i}@example.com`;
    const saltRounds = 10;
    account.password = await bcrypt.hash('123456', saltRounds);
    account.fullname = `Khách hàng ${i}`;
    account.birthday = new Date('1990-01-01');
    account.role = AccountRoleEnum.CUSTOMER;
    account.status = UserStatusEnum.ACTIVE;

    await accountRepository.save(account); // Lưu tài khoản vào cơ sở dữ liệu

    // Tạo dữ liệu cho bảng User
    const user = new User();
    user.account = account; // Liên kết với tài khoản đã tạo
    user.full_name = `Khách hàng ${i}`;
    user.phone_number = `012345678${i}`;
    user.avatar = null; // Không có ảnh đại diện

    await userRepository.save(user); // Lưu người dùng vào cơ sở dữ liệu
  }
  console.log('10 khách hàng đã được chèn thành công!');
}
