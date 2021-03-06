import { Layout } from "@panely/components"
import SidemenuSetting from "components/layout/part/SidemenuSetting"
import Scrolltop from "components/layout/part/Scrolltop"
import Footer from "components/layout/part/Footer"
import Header from "components/layout/part/Header"
import PAGE from "config/page.config"

/*
 * Default Layout
 * by default all pages loaded this layout component
 * you can customize the layout by setting the object in page.config.jsx
 * be carefull, if you want to customize this component
 */

class DefaultLayout extends React.Component {
  render() {
    const {
      enableHeader,
      enableFooter,
      enableScrolltop,
    } = PAGE.layout
    const { children } = this.props

    return (
      <Layout type="holder">
        <Layout type="wrapper">
          {enableHeader ? <Header /> : null}
          <Layout type="content">
            {children}
          </Layout>
          {enableFooter ? <Footer /> : null}
        </Layout>
        {enableScrolltop ? <Scrolltop /> : null}
        {enableHeader ? <SidemenuSetting /> : null}
      </Layout>
    )
  }
}

export default DefaultLayout
