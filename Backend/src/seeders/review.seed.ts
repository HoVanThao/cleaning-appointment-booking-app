import { AppDataSource } from '../config/data-source';
import { User } from '../entity/user.entity';
import { Company } from '../entity/company.entity';
import { Review } from '../entity/review.entity';

export async function seedReviews() {
  const userRepository = AppDataSource.getRepository(User);
  const companyRepository = AppDataSource.getRepository(Company);
  const reviewRepository = AppDataSource.getRepository(Review);

  const users = await userRepository.find();
  const companies = await companyRepository.find();

  for (let i = 1; i <= 20; i++) {
    const review = new Review();
    review.user = users[i % users.length]; // Chọn ngẫu nhiên người dùng
    review.company = companies[i % companies.length]; // Chọn ngẫu nhiên công ty
    review.rating = Math.floor(Math.random() * 5) + 1; // Điểm ngẫu nhiên từ 1 đến 5
    review.comment = `Đánh giá cho công ty ${i}`;

    await reviewRepository.save(review);
  }

  console.log('20 đánh giá đã được chèn thành công!');
}
