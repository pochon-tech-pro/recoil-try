import { useRecoilCallback } from 'recoil';
import { Task } from '../types';
import { taskSelector } from '../states/selectors';

export const useTask = () => {
  const setTasks = useRecoilCallback((api) => (tasks: Task[]) => {
    tasks.forEach((task) => {
      api.set(taskSelector(task.id), task);
    });
  });

  return {setTasks}
};
