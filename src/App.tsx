import {VFC} from "react";
import Counter from "./Counter";
import TryRecoilAtomAndSelector from "./TryRecoilAtomAndSelector";
import {Routes, Route, Link} from 'react-router-dom';

const App: VFC = () => {
    return (
        <>
            <ul>
                <li><Link to={"try-recoil"}>try-recoil</Link></li>
                <li><Link to={"counter"}>counter</Link></li>
            </ul>
            <br /><br /><br /><br />
            <Routes>
                <Route path={"/"} element={<>Recoil Practice</>} />
                <Route path={"/try-recoil"} element={<TryRecoilAtomAndSelector />} />
                <Route path={"/counter"} element={<Counter/>} />
            </Routes>
        </>
    )
}

export default App