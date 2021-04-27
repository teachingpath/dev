import { Layout } from "@panely/components"
import Scrolltop from "components/layout/part/Scrolltop"
import Footer from "components/layout/part/Footer"
import PublicHeader from "components/layout/part/PublicHeader"


class PublicLayout extends React.Component {
  render() {
   
    const { children } = this.props

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
      </Layout>
    )
  }
}

export default PublicLayout
