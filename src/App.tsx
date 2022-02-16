import {VFC} from "react";
import Counter from "./Counter";
import TryRecoilAtomAndSelector from "./practice/TryRecoilAtomAndSelector";
import {Routes, Route, Link} from 'react-router-dom';
import TryErrorBoundary from "./practice/TryErrorBoundary";
import TryErrorBoundaryInvalidSample from "./practice/TryErrorBoundaryInvalidSample";
import TryUseEffect from "./practice/TryUseEffect";
import TrySuspense from "./practice/TrySuspense";
import TryRecoilSelectAsync from "./practice/TryRecoilSelectAsync";
import TryCustomHooks from "./practice/TryCustomHooks";

const App: VFC = () => {
    return (
        <>
            <ul>
                <li><Link to={"try-recoil"}>try-recoil</Link></li>
                <li><Link to={"counter"}>counter</Link></li>
                <li><Link to={"try-error"}>try-error</Link></li>
                <li><Link to={"try-use-effect"}>try-useEffect</Link></li>
                <li><Link to={"try-suspense"}>try-suspense</Link></li>
                <li><Link to={"try-recoil-select-async"}>try-recoil-select-async</Link></li>
                <li><Link to={"try-custom-hooks"}>try-custom-hooks</Link></li>
            </ul>
            <br/><br/><br/><br/>
            <Routes>
                <Route path={"/"} element={<>Recoil Practice</>}/>
                <Route path={"/try-recoil"} element={<TryRecoilAtomAndSelector/>}/>
                <Route path={"/counter"} element={<Counter/>}/>
                <Route path={"/try-error"}
                       element={<TryErrorBoundary><TryErrorBoundaryInvalidSample/></TryErrorBoundary>}/>
                <Route path={"/try-use-effect"} element={<TryUseEffect/>}/>
                <Route path={"/try-suspense"} element={<TrySuspense/>}/>
                <Route path={"/try-recoil-select-async"} element={<TryRecoilSelectAsync/>}/>
                <Route path={"/try-custom-hooks"} element={<TryCustomHooks/>}/>

            </Routes>
        </>
    )
}

export default App