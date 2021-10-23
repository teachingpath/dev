import Toast from "./part/Toast";

function withLayout(Page, layout = "default") {
  class LayoutWrapper extends React.Component {
    static async getInitialProps(ctx) {
      let initialProps = {};

      // Get initial properties
      if (Page.getInitialProps) {
        initialProps = await Page.getInitialProps(ctx);
      }

      return {
        ...initialProps,
        layout,
      };
    }

    render() {
      return (
        <>
          <Page {...this.props} />
          <Toast />
        </>
      );
    }
  }

  return LayoutWrapper;
}

export default withLayout;
