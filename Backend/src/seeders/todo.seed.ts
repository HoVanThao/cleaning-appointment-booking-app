import { AppDataSource } from '../config/data-source';
import { User } from '../entity/user.entity';
import { Todo } from '../entity/todo.entity';

export async function seedTodos() {
  const userRepository = AppDataSource.getRepository(User);
  const todoRepository = AppDataSource.getRepository(Todo);

  const users = await userRepository.find();

  for (let i = 1; i <= 5; i++) {
    const todo = new Todo();
    todo.user = users[i % users.length]; // Chọn ngẫu nhiên người dùng
    todo.title = `Công việc ${i}`;
    todo.description = `Mô tả công việc ${i}`;
    todo.due_date = new Date();
    todo.start_time = '09:00:00';
    todo.end_time = '17:00:00';
    todo.task_content = `Nội dung công việc ${i}`;
    todo.location = `Địa điểm ${i}`;
    todo.status = 'pending'; // Trạng thái công việc

    await todoRepository.save(todo);
  }

  console.log('5 công việc đã được chèn thành công!');
}
