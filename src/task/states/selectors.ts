import { DefaultValue, selector, selectorFamily } from 'recoil';
import { Task, TaskId } from '../types';
import {
  taskDescriptionAtom,
  taskIdsAtom,
  taskIsDoneAtom,
  taskTitleAtom,
} from './atoms';

/**
 * なるべくComponentが呼び出すのはここSelector関係だけにする。
 */

export const taskSelector = selectorFamily<Task, TaskId>({
  key: 'TaskSelector',
  get:
    (taskId) =>
    ({ get }) => {
      return {
        id: taskId,
        title: get(taskTitleAtom(taskId)),
        description: get(taskDescriptionAtom(taskId)),
        isDone: get(taskIsDoneAtom(taskId)),
      };
    },

  set:
    (taskId) =>
    ({ get, set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        // Reset呼び出し時
        reset(taskTitleAtom(taskId));
        reset(taskDescriptionAtom(taskId));
        reset(taskIsDoneAtom(taskId));
        return;
      }

      set(taskTitleAtom(taskId), newValue.title);
      newValue.description &&
        set(taskDescriptionAtom(taskId), newValue.description);
      set(taskIsDoneAtom(taskId), newValue.isDone);

      // 全件参照用にTaskIDのみの配列を保持。
      !get(taskIdsAtom).find((taskId) => taskId === newValue.id) &&
        set(taskIdsAtom, (ids) => [...ids, newValue.id]);
    },
});

export const tasksSelector = selector<Task[]>({
  key: 'tasksSelector',
  get: ({ get }) => {
    const taskIds = get(taskIdsAtom);
    return taskIds.map((taskId) => get(taskSelector(taskId)));
  },
});
