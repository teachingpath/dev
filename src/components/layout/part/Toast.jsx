import Swal from "@panely/sweetalert2";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { pageCloseAlert } from "store/actions/pageAction";
import swalContent from "sweetalert2-react-content";

const ReactSwal = swalContent(Swal);
const toast = ReactSwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", ReactSwal.stopTimer);
    toast.addEventListener("mouseleave", ReactSwal.resumeTimer);
  },
});

const Toast = ({ alert, pageCloseAlert }) => {
  useEffect(() => {
    if (alert) {
      toast
        .fire({
          icon: alert.icon || "success",
          title: alert.msn,
        })
        .then(() => {
          pageCloseAlert();
        });
    }
  }, [alert !== undefined]);
  return <></>;
};

function mapStateToProps(state) {
  return {
    alert: state.page?.alert,
  };
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageCloseAlert }, dispatch);
}

export default connect(mapStateToProps, mapDispathToProps)(Toast);
