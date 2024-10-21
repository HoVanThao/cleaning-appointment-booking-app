import { AppDataSource } from '../config/data-source';
import { Company } from '../entity/company.entity';
import { Statistic } from '../entity/statistic.entity';

export async function seedStatistics() {
  const companyRepository = AppDataSource.getRepository(Company);
  const statisticRepository = AppDataSource.getRepository(Statistic);

  const companies = await companyRepository.find();

  for (const company of companies) {
    const statistic = new Statistic();
    statistic.company = company;
    statistic.total_revenue = Math.random() * 1000000; // Doanh thu ngẫu nhiên
    statistic.total_jobs = Math.floor(Math.random() * 100); // Số lượng công việc ngẫu nhiên
    statistic.successful_jobs = Math.floor(Math.random() * 50); // Số lượng công việc thành công
    statistic.failed_jobs = Math.floor(Math.random() * 20); // Số lượng công việc thất bại
    statistic.statistic_date = new Date();

    await statisticRepository.save(statistic);
  }

  console.log('Dữ liệu thống kê đã được chèn thành công!');
}
