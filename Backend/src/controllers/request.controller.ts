import { Request, Response } from 'express';
import { RequestService } from '../services/request.service';
import { CreateRequestDto } from '../dtos/request.dto';

const requestService = new RequestService();

export class RequestController {
  async create(req: Request, res: Response) {
    try {
      const data: CreateRequestDto = req.body;
      const newRequest = await requestService.createRequest(data);
      res.status(201).json(newRequest);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const requests = await requestService.getRequests();
      res.status(200).json(requests);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const request = await requestService.getRequestById(id);
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }
      res.status(200).json(request);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const data: Partial<CreateRequestDto> = req.body;
      const updatedRequest = await requestService.updateRequest(id, data);
      if (!updatedRequest) {
        return res.status(404).json({ message: 'Request not found' });
      }
      res.status(200).json(updatedRequest);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      await requestService.deleteRequest(id);
      res.status(200).json({ message: 'Đã xóa thành công' });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }
}
