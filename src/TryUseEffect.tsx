import {useEffect, useState, VFC} from "react";

const fetchTodoList = (): Promise<string[]> => {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve(['Todo1', 'Todo2', 'Todo3', 'Todo4'])
        }, 1000)
    })
}

const TryUseEffect: VFC = () => {
    const [todos, setTodos] = useState<string[]>([])

    useEffect(() => {
        const callback = (res: string[]) => setTodos(res)
        fetchTodoList().then(callback)
    }, [todos])

    const items = todos.map((todo, idx) => <li key={idx}>{todo}</li>)
    return <ul>{items}</ul>
}

export default TryUseEffect