import { Layout } from "@panely/components"
import Scrolltop from "components/layout/part/Scrolltop"
import Footer from "components/layout/part/Footer"
import PublicHeader from "components/layout/part/PublicHeader"
import FloatButton from "components/layout/part/FloatButton"
import PAGE from "config/page.config"

class PublicLayout extends React.Component {
  render() {
   
    const { children } = this.props
    const { enableFloatButton } = PAGE.layout

    return (
      <Layout type="holder">
        <Layout type="wrapper">
           <PublicHeader /> 
          <Layout type="content">
            {children}
          </Layout>
          <Footer /> 
        </Layout>
         <Scrolltop />
        {enableFloatButton ? <FloatButton /> : null}
      </Layout>
    )
  }
}

export default PublicLayout
