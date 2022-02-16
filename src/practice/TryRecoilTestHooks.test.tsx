import {RecoilRoot, useRecoilState, useRecoilValue} from "recoil"
import {inputState, inputLengthState} from "./TryRecoilTest"
import {renderHook} from "@testing-library/react-hooks";
import {useEffect} from "react";

// --------------------------
// Atom Unit Test
// --------------------------
describe("TestRecoilState-inputState", () => {
    it("初期のinputStateは空である", () => {
        const {result} = renderHook(() => useRecoilValue(inputState), {
            wrapper: RecoilRoot
        })
        expect(result.current).toEqual("")
    })
})

// --------------------------
// Selector Unit Test
// --------------------------
describe("TestRecoilState-inputLengthState", () => {
    it("初期はからなので「No Length」", () => {
        const {result} = renderHook(() => useRecoilValue(inputLengthState), {
            wrapper: RecoilRoot
        })

        expect(result.current).toEqual("No Length")
    })

    it("入力があった場合の長さ", async () => {
        const str = "Hello"
        const {result} = renderHook(() => {
            // 先にMockを使わずに固定値「Hello」をAtomにセットしたあと、Selectorのテストをしている。
            const [input, setInput] = useRecoilState(inputState)
            useEffect(() => {
                setInput(str)
            },[setInput])
            return useRecoilValue(inputLengthState)
        }, {
            wrapper: RecoilRoot
        })

        expect(result.current).toEqual(str.length)
    })
})