import {
  Badge,
  Button,
  Avatar,
  GridNav,
  Portlet,
  Dropdown,
  RichList,
  Widget13
} from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { bindActionCreators } from "redux"
import { firebaseClient } from "components/firebase/firebaseClient"
import { firebaseChange } from "store/actions"
import { connect } from "react-redux"
import * as RegularIcon from "@fortawesome/free-regular-svg-icons"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import verifyCookie from "components/firebase/firebaseVerifyCookie"
import swalContent from "sweetalert2-react-content"
import SimpleBar from "simplebar"
import Router from "next/router"
import Swal from "@panely/sweetalert2"
import PAGE from "config/page.config"

// Use SweetAlert React Content library
const ReactSwal = swalContent(Swal)

// Set SweetAlert options
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1"
  },
  buttonsStyling: false
})

class HeaderUser extends React.Component {
  state = {
    avatar: () => (
      <Avatar variant="label-light" display circle>
        <FontAwesomeIcon icon={SolidIcon.faUserAlt} />
      </Avatar>
    ),
    name: "Guest",
    email: "No email",
    count: 6,
    navs: [
      [
        {
          icon: () => <FontAwesomeIcon icon={RegularIcon.faAddressCard} />,
          title: "Profile"
        },
        {
          icon: () => <FontAwesomeIcon icon={RegularIcon.faComments} />,
          title: "Messages"
        },
        {
          icon: () => <FontAwesomeIcon icon={RegularIcon.faClone} />,
          title: "Activities"
        }
      ],
      [
        {
          icon: () => <FontAwesomeIcon icon={RegularIcon.faCalendarCheck} />,
          title: "Tasks"
        },
        {
          icon: () => <FontAwesomeIcon icon={RegularIcon.faStickyNote} />,
          title: "Notes"
        },
        {
          icon: () => <FontAwesomeIcon icon={RegularIcon.faBell} />,
          title: "Notification"
        }
      ]
    ]
  }

  handleSignOut = () => {
    // Try to signing out
    firebaseClient.auth().signOut().then(() => {
      // Redirect to login page and remove firebase data from state management
      this.props.firebaseChange(null)
      Router.push(PAGE.loginPagePath)
    }).catch(err => {
      // Show error message with SweetAlert
      swal.fire({ text: err.message, icon: "error" })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.firebase !== prevProps.firebase) {
      // Check whether user has logged in
      if (this.props.firebase) {
        const { name, email } = this.props.firebase

        // Set the component state
        this.setState({
          ...this.state, name, email
        })
      }
    }
  }

  render() {
    const { avatar: WidgetAvatar, name, email, count, navs } = this.state
    const { dispatch, firebase, firebaseChange, ...attributes } = this.props

    return (
      <Dropdown.Uncontrolled {...attributes}>
        <Widget13 dropdown variant="flat-primary">
          <Widget13.Text>
            Hi <strong>User</strong>
          </Widget13.Text>
          {/* BEGIN Avatar */}
          <Widget13.Avatar variant="info">
            <FontAwesomeIcon icon={SolidIcon.faUserAlt} />
          </Widget13.Avatar>
          {/* END Avatar */}
        </Widget13>
        <Dropdown.Menu wide right animated className="overflow-hidden py-0">
          {/* BEGIN Portlet */}
          <Portlet scroll className="border-0">
            <Portlet.Header className="bg-primary rounded-0">
              {/* BEGIN Rich List */}
              <RichList.Item className="w-100 p-0">
                <RichList.Addon addonType="prepend">
                  <WidgetAvatar />
                </RichList.Addon>
                <RichList.Content>
                  <RichList.Title className="text-white" children={name} />
                  <RichList.Subtitle className="text-white" children={email} />
                </RichList.Content>
                <RichList.Addon addonType="append">
                  <Badge variant="warning" shape="square" size="lg" children={count} />
                </RichList.Addon>
              </RichList.Item>
              {/* END Rich List */}
            </Portlet.Header>
            <Portlet.Body className="p-0">
              {/* BEGIN Grid Nav */}
              <GridNav flush action noRounded>
                {navs.map((nav, index) => (
                  <GridNav.Row key={index}>
                    {nav.map((data, index) => {
                      const { icon: Icon, title } = data

                      return <GridNav.Item key={index} icon={<Icon />} children={title} />
                    })}
                  </GridNav.Row>
                ))}
              </GridNav>
              {/* END Grid Nav */}
            </Portlet.Body>
            <Portlet.Footer bordered className="rounded-0">
              <Button variant="label-danger" onClick={this.handleSignOut}>Sign out</Button>
            </Portlet.Footer>
          </Portlet>
          {/* END Portlet */}
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
    )
  }
}

function mapStateToProps(state) {
  return {
    firebase: state.firebase
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ firebaseChange }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUser)
