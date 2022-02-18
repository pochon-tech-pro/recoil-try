import { RecoilRoot, useRecoilValue } from 'recoil';
import { renderHook } from '@testing-library/react-hooks';
import {taskDescriptionAtom, taskIsDoneAtom, taskTitleAtom} from './valueObject';

describe('taskTitleAtom', () => {
  it('初期は空文字', () => {
    const { result } = renderHook(() => useRecoilValue(taskTitleAtom(1001)), {
      wrapper: RecoilRoot,
    });
    expect(result.current).toEqual('');
  });
});

describe('taskDescriptionAtom', () => {
  it('初期は空文字', () => {
    const { result } = renderHook(() => useRecoilValue(taskDescriptionAtom(1001)), {
      wrapper: RecoilRoot,
    });
    expect(result.current).toEqual('');
  });
});

describe('taskIsDoneAtom', () => {
  it('初期はFalse', () => {
    const { result } = renderHook(() => useRecoilValue(taskIsDoneAtom(1001)), {
      wrapper: RecoilRoot,
    });
    expect(result.current).toEqual(false);
  });
});
