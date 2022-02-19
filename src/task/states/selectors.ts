import { DefaultValue, selectorFamily } from 'recoil';
import { Task, TaskId } from '../types';
import {
  taskDescriptionAtom,
  taskIsDoneAtom,
  taskTitleAtom,
} from './atoms';

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
    },
});
