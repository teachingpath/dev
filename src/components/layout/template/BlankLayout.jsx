import { Layout } from "@panely/components"


/*
 * Blank Layout
 * this layout remove all navigation components
 * you can look the usage of this layout in register or login pages
 */

function BlankLayout({ children }) {
  return (
    <Layout type="holder road-background">
      <Layout type="wrapper">
        <Layout type="content">
          {children}
        </Layout>
      </Layout>
    </Layout>
  )
}

export default BlankLayout
