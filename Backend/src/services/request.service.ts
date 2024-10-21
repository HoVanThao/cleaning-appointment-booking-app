import { Repository } from 'typeorm';
import { Request } from '../entity/request.entity';
import { CreateRequestDto } from '../dtos/request.dto';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/user.entity';
import { Company } from '../entity/company.entity';

export class RequestService {
  private requestRepo: Repository<Request>;
  private userRepo: Repository<User>;
  private companyRepo: Repository<Company>;

  constructor() {
    this.requestRepo = AppDataSource.getRepository(Request);
    this.userRepo = AppDataSource.getRepository(User);
    this.companyRepo = AppDataSource.getRepository(Company);
  }

  async createRequest(data: CreateRequestDto) {
    console.log(data);

    // Kiểm tra xem user và company có tồn tại không
    const userExists = await this.userRepo.findOne({
      where: { user_id: data.user_id },
    });
    const companyExists = await this.companyRepo.findOne({
      where: { company_id: data.company_id },
    });

    if (!userExists) {
      throw new Error('User not found');
    }
    if (!companyExists) {
      throw new Error('Company not found');
    }

    const newRequest = this.requestRepo.create({
      user: { user_id: data.user_id }, // Gán đối tượng User bằng ID
      company: { company_id: data.company_id }, // Gán đối tượng Company bằng ID
      name: data.name,
      phone: data.phone,
      address: data.address,
      request_date: new Date(data.request_date),
      timejob: data.timejob,
      status: data.status,
      price: data.price,
      notes: data.notes,
      request: data.request,
    });

    console.log('New Request before save:', newRequest); // Ghi log giá trị mới trước khi lưu
    return await this.requestRepo.save(newRequest);
  }

  async getRequests() {
    return await this.requestRepo.find({ relations: ['user', 'company'] });
  }

  async updateRequest(id: number, data: Partial<CreateRequestDto>) {
    const existingRequest = await this.requestRepo.findOne({
      where: { request_id: id },
    });

    if (!existingRequest) {
      throw new Error('Request not found');
    }
    Object.assign(existingRequest, data);
    await this.requestRepo.save(existingRequest);
    return existingRequest;
  }

  async deleteRequest(id: number) {
    return await this.requestRepo.delete(id);
  }

  async getRequestById(id: number) {
    return await this.requestRepo.findOne({
      where: { request_id: id },
      relations: ['user', 'company'],
    });
  }
}
