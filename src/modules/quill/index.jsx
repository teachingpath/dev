import dynamic from "next/dynamic"

const Quill = dynamic(() => import("quill"), { ssr: false })
const Mixin = dynamic(() => import("./mixin"), { ssr: false })
const Component = dynamic(() => import("./component"), { ssr: false })

export { Quill, Mixin }
export default Component
