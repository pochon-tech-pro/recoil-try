export type TaskId = number;
export type TaskTitle = string;
export type TaskDescription = string;
export type TaskIsDone = boolean;

export type Task = {
  id: TaskId;
  title: TaskTitle;
  description?: TaskDescription;
  isDone: TaskIsDone;
};
