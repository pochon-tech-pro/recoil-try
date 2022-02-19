import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { renderHook } from '@testing-library/react-hooks';
import { taskSelector } from './selectors';
import { useEffect } from 'react';
import { TaskEntity } from '../types';

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

  it('State反映時', () => {
    const data: TaskEntity = {
      id: 1001,
      title: 'Hello World',
      description: 'Hello World Description',
      isDone: false,
    };
    const { result } = renderHook(
      () => {
        const [task, setTask] = useRecoilState(taskSelector(data.id));
        useEffect(() => {
          setTask(data);
        }, [setTask]);
        return task;
      },
      {
        wrapper: RecoilRoot,
      },
    );

    const { id, title, description, isDone } = result.current;
    expect(id).toEqual(data.id);
    expect(title).toEqual(data.title);
    expect(description).toEqual(data.description);
    expect(isDone).toEqual(data.isDone);
  });
});
