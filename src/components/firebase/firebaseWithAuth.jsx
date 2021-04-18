import { bindActionCreators } from "redux";
import { firebaseChange } from "store/actions";
import { connect } from "react-redux";
import { userChange } from "store/actions";
import { firestoreClient } from "./firebaseClient";
import verifyCookie from "components/firebase/firebaseVerifyCookie";
import Router from "next/router";
import PAGE from "config/page.config";

function firebaseWithAuth(AuthComponent) {
  class Authentication extends React.Component {
    static async getInitialProps(ctx) {
      let initialProps = {};

      // Get initial properties
      if (AuthComponent.getInitialProps) {
        initialProps = await AuthComponent.getInitialProps(ctx);
      }

      // Verify cookie
      const result = await verifyCookie(ctx);

      // Check cookie is valid or not
      if (!result) {
        // Redirect to login page
        if (ctx.res) {
          ctx.res.writeHead(302, { Location: PAGE.loginPagePath });
          ctx.res.end();
        } else {
          Router.push(PAGE.loginPagePath);
        }

        return {
          ...initialProps,
          firebase: null,
        };
      }

      return {
        ...initialProps,
        firebase: result,
      };
    }

    componentDidMount() {
      this.props.firebaseChange(this.props.firebase);
      firestoreClient
        .collection("users")
        .doc(this.props.firebase?.user_id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.props.userChange({
              ...doc.data(),
              uid: this.props.firebase?.user_id
            });
          }
        });
    }

    render() {
      return <AuthComponent {...this.props} />;
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ firebaseChange, userChange }, dispatch);
  }

  return connect(null, mapDispatchToProps)(Authentication);
}

export default firebaseWithAuth;
