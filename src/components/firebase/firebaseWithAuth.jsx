import { bindActionCreators } from "redux";
import { firebaseChange } from "store/actions";
import { connect } from "react-redux";
import { userChange } from "store/actions";
import { firestoreClient } from "./firebaseClient";
import Router from "next/router";
import nookies from "nookies";
import jwt_decode from 'jwt-decode';

import PAGE from "config/page.config";
import Spinner from "@panely/components/Spinner";

function firebaseWithAuth(AuthComponent) {
  class Authentication extends React.Component {
    static async getInitialProps(ctx) {
  
      let initialProps = {};

      // Get initial properties
      if (AuthComponent.getInitialProps) {
        initialProps = await AuthComponent.getInitialProps(ctx);
      }

      const cookies = nookies.get(ctx)

      // Check cookie is valid or not
      if (!cookies.token) {
        // Redirect to login page
        if (ctx.res) {
          ctx.res.writeHead(302, { Location: PAGE.loginPagePath });
          ctx.res.end();
        } else {
          Router.push(PAGE.loginPagePath);
        }
      }

      const claims = jwt_decode(cookies.token);
      return {
        ...initialProps,
        firebase: {
          user_id: claims.user_id,
          email: claims.email,
          name: claims.name
        },
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
              uid: this.props.firebase?.user_id,
            });
          }
        });
    }

    render() {
      if (this.props.user === null) {
        return <Spinner className="m-5"></Spinner>;
      }
      return <AuthComponent {...this.props} />;
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ firebaseChange, userChange }, dispatch);
  }
  function mapStateToProps(state) {
    return {
      user: state.user,
    };
  }
  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}

export default firebaseWithAuth;
