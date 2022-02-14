import React, {Suspense} from 'react';
import {selector, useRecoilValue} from "recoil";

const fetchData = async (delay: number) => {
    return new Promise<{ name: string }[]>((resolve, _) => {
        setTimeout(() => resolve([{name: 'John'}, {name: 'Mike'}, {name: 'Taro'}]), delay)
    })
}

const userDataState = selector({
    key: 'sample/userData',
    get: async ({get}) => {
        return await fetchData(1000)
    }
});

const UserDataList = () => {
    const users = useRecoilValue(userDataState)
    return (
        <ul>
            {users.map((user, idx) => {
                return <li key={idx}>{user.name}</li>
            })}
        </ul>
    )
};

export const TryRecoilSelectAsync = () => {
    return <Suspense fallback={<>Loading...</>}><UserDataList/></Suspense>
};

export default TryRecoilSelectAsync;