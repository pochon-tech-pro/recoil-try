import { useRecoilCallback } from 'recoil';
import { Task, TaskId } from '../types';
import { taskSelector } from '../states/selectors';
import { taskIdsAtom } from '../states/atoms';

export const useTask = () => {
  const setTasks = useRecoilCallback(
    (api) => (tasks: Task[]) => {
      tasks.forEach((task) => {
        api.set(taskSelector(task.id), task);
      });
    },
    [],
  );

  const setTask = useRecoilCallback((api) => (newTask: Task) => {
    api.set(taskSelector(newTask.id), newTask);
  });

  const removeTask = useRecoilCallback((api) => (taskId: TaskId) => {
    api.reset(taskSelector(taskId));
    api.set(taskIdsAtom, (tasks) =>
      tasks.filter((id: TaskId) => id !== taskId),
    );
  });

  return { setTasks, setTask, removeTask };
};
