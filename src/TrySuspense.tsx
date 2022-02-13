import React, {Suspense} from 'react';

const wrapPromise = (promise: Promise<string[]>) => {
    let status: string = 'pending'
    let result: string[]

    const suspender = promise.then(
        (r: string[]) => {
            status = 'fulfilled'
            result = r
        },
        (e: any) => {
            status = 'rejected'
            result = e
        });

    return () => {
        if (status === 'pending') {
            throw suspender;
        } else if (status === 'rejected') {
            throw result;
        } else {
            return result;
        }
    };
}

const fetchTodoList = (delay: number) => {
    const promise = new Promise<string[]>((resolve, _) => {
        setTimeout(() => {
            resolve(['Todo1', 'Todo2', 'Todo3']);
        }, delay)
    })

    return wrapPromise(promise)
}
const todoListResource = fetchTodoList(1500)

const TodoList = () => {
    // todoListResource()の呼び出しで取得が開始しているわけではない。（再度画面遷移すればわかる）
    // 宣言的に呼び出しされた後のことを考えてDOMの構築定義を行っている。
    return <ul>{todoListResource().map((todo: string, idx: number) => <li key={idx}>{todo}</li>)}</ul>
};

export const TrySuspense = () => {
    return <Suspense fallback={<>Loading...</>}><TodoList/></Suspense>
};

export default TrySuspense;