import {VFC} from "react";

const TryErrorBoundaryInvalidSample: VFC = () => {
    const user: any = null
    return <div>Hello !! : Mr. {user!.name}</div>
}

export default TryErrorBoundaryInvalidSample