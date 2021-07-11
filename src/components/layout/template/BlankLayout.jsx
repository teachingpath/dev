import { Layout } from "@panely/components"
import Footer from "components/layout/part/Footer"


/*
 * Blank Layout
 * this layout remove all navigation components
 * you can look the usage of this layout in register or login pages
 */

function BlankLayout({ children }) {
  return (
    <Layout className="holder road-background">
      <Layout type="wrapper">
        <Layout type="content">
          {children}
        </Layout>
        <Footer></Footer>
      </Layout>
    </Layout>
  )
}

export default BlankLayout
