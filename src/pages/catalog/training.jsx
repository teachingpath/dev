import {
  Row,
  Col,
  Container,
  Dropdown,
  Widget1,
  Card,
  Progress,
  Collapse,
  Accordion,
  Modal,
  Timeline,
  Marker,
} from "@panely/components";
import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import withAuth from "components/firebase/firebaseWithAuth";
import Router from "next/router";
import Steps from "rc-steps";
import Button from "@panely/components/Button";
import Countdown, { zeroPad } from "react-countdown";
import QuestionForm from "./question";

class Training extends React.Component {
  state = { current: 0 };
  render() {
    const {
      data: { training },
    } = this.props;
    return (
      <Steps current={this.state.current} direction="vertical">
        {training?.map((item, index) => {
          return (
            <Steps.Step
              key={index}
              title={"Step#" + (index + 1)}
              description={
                <>
                  <div dangerouslySetInnerHTML={{ __html: item.name }} />
                  {this.state.current === index && (
                    <Button
                      onClick={() => {
                        this.setState({ current: this.state.current + 1 });
                      }}
                    >
                      Done
                    </Button>
                  )}
                </>
              }
            />
          );
        })}
      </Steps>
    );
  }
}

export default Training;
