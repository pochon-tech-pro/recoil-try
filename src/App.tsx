import React, {useState, VFC} from 'react';
import './App.css';
import {useRecoilState} from "recoil";

import {atom} from "recoil";

type User = {
    name: string
    age: number
    enable: boolean
}

const stateUsers = atom<User[] | []>({
    key: "stateUsers",
    default: []
})

const App: VFC = () => {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [enable, setEnable] = useState(false)

    const [users, setUsers] = useRecoilState(stateUsers)

    const saveHandler = () => setUsers([...users, {name, age, enable}])

    return (
        <div className="App">
            <div>名前: <input type="text" value={name} onChange={e => setName(e.target.value)}/></div>
            <div>年齢: <input type="text" value={age} onChange={e => setAge(Number(e.target.value))}/></div>
            <div>可否:
                <label>
                    <input type="radio" checked={enable} onChange={e => setEnable(!!e.target.value)}/>
                    <span>True</span>
                </label>
                <label>
                    <input type="radio" checked={!enable} onChange={e => setEnable(!e.target.value)}/>
                    <span>False</span>
                </label>
            </div>

            <button onClick={saveHandler}>保存</button>
            <br/>

            <ul>
                {users.map((user, idx) => {
                    return <li key={idx}>{user.name} : {user.age} : {user.enable.toString()} </li>
                })}
            </ul>
        </div>
    );
}

export default App;
