import {Component} from "react";

class TryErrorBoundary extends Component<{}, { hasError: boolean }> {
    constructor(props: {}) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    // これを実装する
    static getDerivedStateFromError(): { hasError: boolean } {
        return {hasError: true}
    }

    render() {
        if (this.state.hasError) {
            return <>
                <div>エラーが発生しました（Throwされました）</div>
                <div>ただし、コンポーネント内部で発生したエラーをError Boundaryで捕らえています。</div>
                <div>なので真っ白になりません。</div>
            </>
        }
        return this.props.children
    }
}

export default TryErrorBoundary