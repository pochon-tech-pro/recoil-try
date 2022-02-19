import {atom, atomFamily} from 'recoil';
import {TaskDescription, TaskId, TaskIsDone, TaskTitle} from '../types';

export const taskTitleAtom = atomFamily<TaskTitle, TaskId>({
  key: 'taskTitleAtom',
  default: (_) => '',
});

export const taskDescriptionAtom = atomFamily<TaskDescription, TaskId>({
  key: 'taskDescriptionAtom',
  default: '',
});

export const taskIsDoneAtom = atomFamily<TaskIsDone, TaskId>({
  key: 'taskIsDoneAtom',
  default: false,
});

export const taskIdsAtom = atom<TaskId[]>({
  key: "taskIdsAtom",
  default: []
})