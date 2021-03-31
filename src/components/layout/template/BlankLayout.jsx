import { Layout } from "@panely/components"
import FloatButton from "components/layout/part/FloatButton"
import PAGE from "config/page.config"

/*
 * Blank Layout
 * this layout remove all navigation components
 * you can look the usage of this layout in register or login pages
 */

function BlankLayout({ children }) {
  const { enableFloatButton } = PAGE.layout

  return (
    <Layout type="holder">
      <Layout type="wrapper">
        <Layout type="content">
          {children}
        </Layout>
      </Layout>
      {enableFloatButton ? <FloatButton /> : null}
    </Layout>
  )
}

export default BlankLayout
