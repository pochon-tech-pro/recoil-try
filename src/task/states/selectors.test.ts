import {RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import { renderHook } from '@testing-library/react-hooks';
import { taskSelector } from './selectors';
import { useEffect } from 'react';
import { Task } from '../types';
import {taskIdsAtom} from "./atoms";

const testData1: Task = {
  id: 1001,
  title: 'Hello World',
  description: 'Hello World Description',
  isDone: false,
}

const testData2: Task = {
  id: 1002,
  title: 'Hello World !!',
  description: 'Hello World Description !!',
  isDone: true,
}


describe('taskSelector', () => {
  it('初期は空文字', () => {
    const taskId = 1001;
    const { result } = renderHook(() => useRecoilValue(taskSelector(taskId)), {
      wrapper: RecoilRoot,
    });

    const { id, title, description, isDone } = result.current;
    expect(id).toEqual(taskId);
    expect(title).toEqual('');
    expect(description).toEqual('');
    expect(isDone).toEqual(false);
  });

  // TODO:更新時のテスト
  it('Task新規登録時にStateが正常に格納されている', () => {
    const { result } = renderHook(
      () => {
        const [task, setTask] = useRecoilState(taskSelector(testData1.id));
        useEffect(() => {
          setTask(testData1);
        }, [setTask]);
        return task;
      },
      {
        wrapper: RecoilRoot,
      },
    );

    const { id, title, description, isDone } = result.current;
    expect(id).toEqual(testData1.id);
    expect(title).toEqual(testData1.title);
    expect(description).toEqual(testData1.description);
    expect(isDone).toEqual(testData1.isDone);
  });

  it('Taskが新規登録時にtaskIds配列にも値が格納されている', () => {
    const { result } = renderHook(
        () => {
          const setTask = useSetRecoilState(taskSelector(testData2.id));
          useEffect(() => {
            setTask(testData2);
          }, [setTask]);

          return useRecoilValue(taskIdsAtom)
        },
        {
          wrapper: RecoilRoot,
        },
    );
    expect(result.current).toEqual([testData2.id])
  });
});
