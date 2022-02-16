import React, {useState} from 'react';

type User = {
    name: string
    age: number
    hobbies: string[]
}
const useUser = () => {
    const [user, setUser] = useState<User>({name: 'Dummy', age: 20, hobbies: []})
    const addHobby = (target: string) => {
        setUser({...user, hobbies: [...user.hobbies, target]})
    }
    return {user, addHobby}
}

export const TryCustomHooks = () => {
    const {user, addHobby} = useUser()
    const [input, setInput] = useState<string>('')
    const setInputHandler = () => {
        addHobby(input)
        setInput('')
    }

    return (
        <div>
            <div>{user.name}さんは{user.age}才です。</div>
            <div>
                <ul>
                    {user.hobbies.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
            </div>
            <div>
                <input type={"text"} value={input} onChange={e => setInput(e.target.value)}/>
                <button onClick={setInputHandler}>登録</button>
            </div>
        </div>
    )
}

export default TryCustomHooks;