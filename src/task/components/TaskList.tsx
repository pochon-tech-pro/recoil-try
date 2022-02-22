import {FC, useCallback, useEffect} from 'react';
import { useRecoilValue } from 'recoil';
import { useTask } from '../hooks/useTask';
import { Task } from '../types';
import { tasksSelector } from '../states/selectors';

const dummyAPIResponseData = async (delay: number) => {
  return new Promise<Task[]>((resolve, _) => {
    setTimeout(
      () =>
        resolve([
          {
            id: 101,
            title: 'Task1',
            description: 'Task1 description',
            isDone: false,
          },
          {
            id: 102,
            title: 'Task2',
            description: 'Task2 description',
            isDone: true,
          },
          {
            id: 103,
            title: 'Task3',
            description: 'Task3 description',
            isDone: false,
          },
        ]),
      delay,
    );
  });
};

export const TaskList: FC = () => {
  const tasks = useRecoilValue(tasksSelector);
  const { setTasks, setTask, removeTask } = useTask();

  useEffect(() => {
    (async () => {
      const data = await dummyAPIResponseData(1000);
      setTasks(data);
    })();
  }, [setTasks]);

  const toggleDone = useCallback((task: Task) => {
    return setTask({
        ...task,
        isDone: !task.isDone
    })
  }, [setTask])

  return (
    <div>
      <h2>Recoil & Custom Hooks Test</h2>
      <ul>
        {tasks.map((task, idx) => {
          return (
            <li key={idx}>
                <div>
                    {task.id} : {task.title} _ {task.description} _{' '}
                    {task.isDone ? '済' : '未'}
                    <button onClick={() => toggleDone(task)} style={{margin: 10}}>チェック</button>
                    <button onClick={() => removeTask(task.id)}>削除</button>
                </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
