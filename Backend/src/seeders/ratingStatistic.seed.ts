import { AppDataSource } from '../config/data-source';
import { Company } from '../entity/company.entity';
import { RatingStatistic } from '../entity/ratingStatistic.entity';

export async function seedRatingStatistics() {
  const companyRepository = AppDataSource.getRepository(Company);
  const ratingRepository = AppDataSource.getRepository(RatingStatistic);

  const companies = await companyRepository.find();

  for (let i = 0; i < companies.length; i++) {
    const ratingStatistic = new RatingStatistic();
    ratingStatistic.company = companies[i];
    ratingStatistic.rating = Math.floor(Math.random() * 5) + 1; // Điểm ngẫu nhiên từ 1 đến 5
    ratingStatistic.count = Math.floor(Math.random() * 100); // Số lượng ngẫu nhiên

    await ratingRepository.save(ratingStatistic);
  }

  console.log('Dữ liệu RatingStatistic đã được chèn thành công!');
}
