import {VFC} from "react";
import {atom, DefaultValue, selector, useRecoilState, useRecoilValue} from "recoil";

const countRecoilState = atom<number>({
    key: 'sample/count',
    default: 1
})

const doubleCountRecoilState = selector<number>({
    key: 'sample/doubleCount',
    get: ({get}) => get(countRecoilState) * 2,
    set: ({get, set}, newValue) => {
        if (newValue instanceof DefaultValue) return // reset call
        set(countRecoilState, newValue)  // selectorを通した値更新
    }
})

const Counter: VFC = () => {
    const origin = useRecoilValue(countRecoilState)
    const [double, setDouble] = useRecoilState(doubleCountRecoilState)
    return <button onClick={() => setDouble((count) => count)}>
        atom : {origin} selector.get: {double}
    </button>
}

export default Counter