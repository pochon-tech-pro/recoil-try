import {RecoilRoot} from "recoil"
import {fireEvent, render} from "@testing-library/react"
import TryRecoilTest from "./TryRecoilTest"

describe("TestRecoilState", () => {
    it("初期のinputStateは空である", () => {
        const {queryByTestId} = render(<TryRecoilTest/>, {wrapper: RecoilRoot})

        const input = queryByTestId("input") as HTMLInputElement
        expect(input.value).toEqual("")
    })

    it('初期のinputLengthStateは"No Length"である', () => {
        const {queryByTestId} = render(<TryRecoilTest/>, {wrapper: RecoilRoot})

        const queryLength = queryByTestId("input-length") as HTMLDivElement
        expect(queryLength.innerHTML).toEqual("Length: No Length")
    })

    it("入力があった場合の状態変化の確認", async () => {
        const {queryByTestId} = render(<TryRecoilTest/>, {wrapper: RecoilRoot})

        const input = queryByTestId("input") as HTMLInputElement
        // fireEvent: Eventの発火
        fireEvent.change(input, {target: {value: "Hello World"}})

        const queryLength = queryByTestId("input-length") as HTMLDivElement
        expect(queryLength.innerHTML).toEqual("Length: 11")
    })
})
