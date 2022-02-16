import { renderHook, act } from '@testing-library/react-hooks'
import useTryCustomHooksTest from './TryCustomHooksTest'

// --------------------------------------
// @testing-library/react-hooks: Componentを用意せずに純粋にロジックのテストが可能
// react-scripts test --testNamePattern=Test1
// --------------------------------------
test('Test1', () => {
    const { result } = renderHook(() => useTryCustomHooksTest())
    act(() => {
        result.current.increment()
    })
    expect(result.current.count).toBe(1)
})