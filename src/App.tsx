import React, {useState, VFC} from 'react';
import './App.css';
import {useRecoilState} from "recoil";

import {atom} from "recoil";

type User = {
    name: string
    age: number
}

const stateUsers = atom<User[] | []>({
    key: "state-user",
    default: []
})

const App: VFC = () => {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)

    const [users, setUsers] = useRecoilState(stateUsers)

    const saveHandler = () => setUsers([...users, {name, age}])

    return (
        <div className="App">
            <div>名前: <input type="text" value={name} onChange={e => setName(e.target.value)}/></div>
            <div>年齢: <input type="text" value={age} onChange={e => setAge(Number(e.target.value))}/></div>
            <button onClick={saveHandler}>保存</button>

            <ul>
                {users.map((user, idx) => {
                    return <li key={idx}>{user.name} : {user.age} </li>
                })}
            </ul>
        </div>
    );
}

export default App;
