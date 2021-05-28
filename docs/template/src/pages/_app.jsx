// All components stylesheets
import "styles/core/reboot.scss"
import "styles/components/index.scss"
import "styles/quill/core.scss"
import "styles/quill/snow.scss"
import "styles/quill/bubble.scss"
import "styles/apexcharts/index.scss"
import "styles/simplebar/index.scss"
import "styles/sortablejs/sortablejs.scss"
import "styles/sweetalert2/index.scss"
import "styles/slick-carousel/index.scss"

import { AuthProvider } from "components/firebase/firebaseAuth"
import { bindActionCreators } from "redux"
import { pageChangeTheme } from "store/actions"
import { wrapper } from "store"
import { connect } from "react-redux"
import DefaultLayout from "components/layout/template/DefaultLayout"
import BlankLayout from "components/layout/template/BlankLayout"
import ProgressBar from "@panely/progressbar"
import Router from "next/router"
import App from "next/app"

class MyApp extends App {
  componentDidMount() {
    // Check whether dark mode support is available or not
    const darkModeActive = window.matchMedia("(prefers-color-scheme: dark)").matches

    // Enable/disable dark mode
    this.props.pageChangeTheme(darkModeActive ? "dark" : "light")
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      // Toggling theme body class
      if (this.props.theme === "dark") {
        document.body.classList.remove("theme-light")
        document.body.classList.add("theme-dark")
      } else {
        document.body.classList.remove("theme-dark")
        document.body.classList.add("theme-light")
      }
    }
  }

  render() {
    const { Component, pageProps } = this.props
    let Layout

    switch (pageProps.layout) {
      case "default":
        Layout = DefaultLayout
        break;
      case "blank":
        Layout = BlankLayout
        break;
      default:
        Layout = BlankLayout
    }

    return (
      <AuthProvider>
        <Layout>
          <ProgressBar />
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    theme: state.page.theme
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ pageChangeTheme }, dispatch)
  }
}

export default wrapper.withRedux(connect(mapStateToProps, mapDispatchToProps)(MyApp))
