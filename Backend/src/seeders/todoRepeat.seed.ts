import { AppDataSource } from '../config/data-source';
import { Todo } from '../entity/todo.entity';
import { TodoRepeat } from '../entity/todoRepeat.entity';
import { RepeatOptionEnum } from '../enums/repeatOption.enum';
import { DayOfWeekEnum } from '../enums/dayOfWeek.enum';

export async function seedTodoRepeats() {
  const todoRepository = AppDataSource.getRepository(Todo);
  const todoRepeatRepository = AppDataSource.getRepository(TodoRepeat);

  const todos = await todoRepository.find();

  for (let i = 0; i < todos.length; i++) {
    const todoRepeat = new TodoRepeat();
    todoRepeat.todo = todos[i];
    todoRepeat.repeat_option = RepeatOptionEnum.LAP_LAI;
    todoRepeat.repeat_days = DayOfWeekEnum.THU_HAI; // Lặp lại vào ngày trong tuần
    todoRepeat.repeat_interval = 1; // Lặp lại sau mỗi 1 ngày

    await todoRepeatRepository.save(todoRepeat);
  }

  console.log('Dữ liệu TodoRepeat đã được chèn thành công!');
}
