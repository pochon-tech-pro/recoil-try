import React, {ChangeEvent, useState, VFC} from 'react';
import {selector, useRecoilState, useRecoilValue} from "recoil";
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

const filterState = atom<string>({
    key: "filterState",
    default: ""
})

const filteredUsers = selector<User[]>({
    key: "filteredUsers",
    get: ({get}) => {
        const filter = get(filterState)
        const list = get(stateUsers)

        switch (filter) {
            case 'OK':
                return list.filter(item => item.enable)
            case 'NG':
                return list.filter(item => !item.enable)
            default :
                return list
        }
    }
})

const TryRecoilAtomAndSelector: VFC = () => {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [enable, setEnable] = useState(false)

    const [users, setUsers] = useRecoilState(stateUsers)
    const saveHandler = () => setUsers([...users, {name, age, enable}])

    const [kind, setKind] = useRecoilState(filterState)
    const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => setKind(e.target.value)

    const filtered = useRecoilValue(filteredUsers)

    return (
        <div className="App">
            <div>名前: <input type="text" value={name} onChange={e => setName(e.target.value)}/></div>
            <div>年齢: <input type="number" value={age} onChange={e => setAge(Number(e.target.value))}/></div>
            <div>可否:
                <label>
                    <input type="radio" checked={enable} onChange={e => setEnable(!!e.target.value)}/>
                    <span>OK</span>
                </label>
                <label>
                    <input type="radio" checked={!enable} onChange={e => setEnable(!e.target.value)}/>
                    <span>NG</span>
                </label>
            </div>

            <br/>
            <button onClick={saveHandler}>保存</button>

            <br/>
            <ul>
                <li> users </li>
                {users.map((user, idx) => {
                    return <li key={idx}>{user.name} : {user.age} : {user.enable ? "OK" : "NG"} </li>
                })}
            </ul>

            <br/>
            <select value={kind} onChange={changeHandler }>
                <option value=''>全て</option>
                <option value='OK'>OK</option>
                <option value='NG'>NG</option>
            </select>
            <br/>
            <ul>
                <li> users (filteredUsers) </li>
                {filtered.map((user, idx) => {
                    return <li key={idx}>{user.name} : {user.age} : {user.enable ? "OK" : "NG"} </li>
                })}
            </ul>
        </div>
    );
}

export default TryRecoilAtomAndSelector;
