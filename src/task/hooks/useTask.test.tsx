import { renderHook } from '@testing-library/react-hooks';
import { useTask } from './useTask';
import { Task } from '../types';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { taskIdsAtom } from '../states/atoms';
import { useEffect } from 'react';
import { act } from '@testing-library/react-hooks/dom';

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

    const {
      result: { current },
    } = renderRecoilHook(scenario);
    expect(current).toStrictEqual(fetchData.map((item) => item.id));
  });

  it('Hooksを呼び出してRecoilStateが更新されているかを確認する(actを使った方法)', () => {
    const useScenario = () => {
      const { setTasks } = useTask();
      const taskIds = useRecoilValue(taskIdsAtom);
      return { setTasks, taskIds };
    };
    const { result } = renderRecoilHook(useScenario);
    expect(result.current.taskIds).toStrictEqual([]); // State更新前

    // CustomHooksで返されるMethodが更新関数の場合はactの中で実施する必要がある。 actの引数のCallbackは非同期でも可能
    act(() => {
      result.current.setTasks(fetchData);
    });
    expect(result.current.taskIds).toStrictEqual(
      fetchData.map((item) => item.id),
    ); // State更新後
  });

  it('setTaskとremoveTaskのテスト', () => {
    const useScenario = () => {
      const { setTask, removeTask } = useTask();
      const taskIds = useRecoilValue(taskIdsAtom);
      return { setTask, removeTask, taskIds };
    };
    const { result } = renderRecoilHook(useScenario);
    expect(result.current.taskIds).toStrictEqual([]); // State更新前

    act(() => {
      result.current.setTask(fetchData.find(each => each.id === 101)!); // テストなので undefined のチェックはしない
    });
    expect(result.current.taskIds).toStrictEqual([101]); // State Set後

    act(() => {
      result.current.removeTask(101);
    });
    expect(result.current.taskIds).toStrictEqual([]); // State Remove後
  });
});
