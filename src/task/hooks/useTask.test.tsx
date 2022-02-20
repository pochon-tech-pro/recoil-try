import { renderHook } from '@testing-library/react-hooks';
import { useTask } from './useTask';
import { Task } from '../types';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { taskIdsAtom } from '../states/atoms';
import { useEffect } from 'react';

const fetchData: Task[] = [
  { id: 101, title: 'Task1', description: 'Task1 description', isDone: false },
  { id: 102, title: 'Task2', description: 'Task2 description', isDone: true },
  { id: 103, title: 'Task3', description: 'Task3 description', isDone: false },
];

// RenderHookの処理はよく使うので共通化。
const renderRecoilHook = <P, R>(callback: (props: P) => R) => {
  return renderHook(callback, {
    wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
  });
};

describe('useTask', () => {
  it('Hooksを呼び出してRecoilStateが更新されているかを確認する', () => {
    const scenario = () => {
      const { setTasks } = useTask();
      useEffect(() => {
        setTasks(fetchData);
      }, [setTasks]);
      return useRecoilValue(taskIdsAtom);
    };

    const { result: {current} } = renderRecoilHook(scenario);
    expect(current).toStrictEqual(fetchData.map(item => item.id))
  });
});
