import {VFC} from "react";
import Counter from "./Counter";
import TryRecoilAtomAndSelector from "./TryRecoilAtomAndSelector";
import {Routes, Route, Link} from 'react-router-dom';
import TryErrorBoundary from "./TryErrorBoundary";
import TryErrorBoundaryInvalidSample from "./TryErrorBoundaryInvalidSample";

const App: VFC = () => {
    return (
        <>
            <ul>
                <li><Link to={"try-recoil"}>try-recoil</Link></li>
                <li><Link to={"counter"}>counter</Link></li>
            </ul>
            <br/><br/><br/><br/>
            <Routes>
                <Route path={"/"} element={<>Recoil Practice</>}/>
                <Route path={"/try-recoil"} element={<TryRecoilAtomAndSelector/>}/>
                <Route path={"/counter"} element={<Counter/>}/>
                <Route path={"/try-error"} element={
                    <TryErrorBoundary><TryErrorBoundaryInvalidSample/></TryErrorBoundary>
                }/>
            </Routes>
        </>
    )
}

export default App