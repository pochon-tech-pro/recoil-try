import {VFC} from "react"
import { atom, useRecoilState, selector, useRecoilValue } from "recoil"

export const inputState = atom({
    key: "inputState",
    default: ""
})

export const inputLengthState = selector({
    key: "inputLengthState",
    get: ({ get }) => {
        const length = get(inputState).length
        return length === 0 ? "No Length" : length
    }
})

const TryRecoilTest: VFC = () => {
    const [input, setInput] = useRecoilState(inputState)
    const inputLength = useRecoilValue(inputLengthState)

    return (
        <>
            <input
                data-testid="input"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <div data-testid="input-length">
                Length: {inputLength}
            </div>
        </>
    )
}

export default TryRecoilTest
