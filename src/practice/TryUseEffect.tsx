import {useEffect, useState, VFC} from "react";

const fetchTodoResource = (delayTime: number) => {
    let timeout: NodeJS.Timeout
    const promise = new Promise<string[]>((resolve, _) => {
        timeout = setTimeout(() => {
            resolve(['Todo1', 'Todo2', 'Todo3', 'Todo4'])
        }, delayTime)
    })

    return {
        promise: promise,
        cancel: () => clearTimeout(timeout) // setTimeoutによるタイマー処理を終了せる
    }
}

const TryUseEffect: VFC = () => {
    const [todos, setTodos] = useState<string[]>([])

    useEffect(() => {
        const callback = (res: string[]) => setTodos(res)
        const todoResource = fetchTodoResource(2000)
        todoResource.promise.then(callback)
        return () => todoResource.cancel() // Cleanup
    }, [todos])

    const items = todos.map((todo, idx) => <li key={idx}>{todo}</li>)
    return <ul>{items}</ul>
}

export default TryUseEffect