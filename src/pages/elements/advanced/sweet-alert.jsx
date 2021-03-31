import { Row, Col, Form, Label, Button, Portlet, Container } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import swalContent from "sweetalert2-react-content"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"
import Swal from "@panely/sweetalert2"

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

// Set SweetAlert toast options
const toast = ReactSwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", ReactSwal.stopTimer)
    toast.addEventListener("mouseleave", ReactSwal.resumeTimer)
  }
})

class SweetAlertPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Sweet Alert")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Advanced" },
      { text: "Sweet Alert", link: "/elements/advanced/sweet-alert" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Sweet Alert | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col xs="12">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Sweet Alert</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    <strong>Sweet alert</strong> is a beautiful, responsive, customizable,
                    accessible replacement for javascripts's popup boxes with zero dependencies.
                    Check{" "}
                    <a href="http://sweetalert2.github.io" target="_blank">
                      Sweet Alert's page
                    </a>{" "}
                    for more info.
                  </p>
                  <hr />
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Basic example
                    </Label>
                    <Col sm="8" lg="9">
                      <Swal1 />
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Title with a text under
                    </Label>
                    <Col sm="8" lg="9">
                      <Swal2 />
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      More complex modal
                    </Label>
                    <Col sm="8" lg="9">
                      <Swal3 />
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Custom HTML description
                    </Label>
                    <Col sm="8" lg="9">
                      <Swal4 />
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Dialog position
                    </Label>
                    <Col sm="8" lg="9">
                      <Swal5 />
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Confirm dialog
                    </Label>
                    <Col sm="8" lg="9">
                      <Swal6 />
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Custom image
                    </Label>
                    <Col sm="8" lg="9">
                      <Swal7 />
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Auto close timer
                    </Label>
                    <Col sm="8" lg="9">
                      <Swal8 />
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      AJAX request
                    </Label>
                    <Col sm="8" lg="9">
                      <Swal9 />
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Chaining modals
                    </Label>
                    <Col sm="8" lg="9">
                      <Swal10 />
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Toast
                    </Label>
                    <Col sm="8" lg="9">
                      <Swal11 />
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

class Swal1 extends React.Component {
  handleClick = () => {
    swal.fire("Any fool can use a computer")
  }

  render() {
    return <Button onClick={this.handleClick}>Click me</Button>
  }
}

class Swal2 extends React.Component {
  handleClick = () => {
    swal.fire("The Internet?", "That thing is still around?", "question")
  }

  render() {
    return <Button onClick={this.handleClick}>Click me</Button>
  }
}

class Swal3 extends React.Component {
  handleClick = () => {
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: <a href="#">Why do I have this issue?</a>
    })
  }

  render() {
    return <Button onClick={this.handleClick}>Click me</Button>
  }
}

class Swal4 extends React.Component {
  handleClick = () => {
    swal.fire({
      title: (
        <strong>
          HTML <u>example</u>
        </strong>
      ),
      icon: "info",
      html: (
        <React.Fragment>
          You can use <b>bold text</b>, <a href="https://sweetalert2.github.io/">links</a> and other
          HTML tag
        </React.Fragment>
      ),
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: (
        <React.Fragment>
          <FontAwesomeIcon icon={SolidIcon.faThumbsUp} /> Great!
        </React.Fragment>
      ),
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: (
        <FontAwesomeIcon icon={SolidIcon.faThumbsDown} />
      ),
      cancelButtonAriaLabel: "Thumbs down"
    })
  }

  render() {
    return <Button onClick={this.handleClick}>Click me</Button>
  }
}

class Swal5 extends React.Component {
  handleClick = () => {
    swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    })
  }

  render() {
    return <Button onClick={this.handleClick}>Click me</Button>
  }
}

class Swal6 extends React.Component {
  handleClick = () => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
      .then(result => {
        if (result.value) {
          swal.fire("Deleted!", "Your file has been deleted.", "success")
        }
      })
  }

  render() {
    return <Button onClick={this.handleClick}>Click me</Button>
  }
}

class Swal7 extends React.Component {
  handleClick = () => {
    swal.fire({
      title: "Sweet!",
      text: "Modal with a custom image.",
      imageUrl: "https://unsplash.it/400/200",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    })
  }

  render() {
    return <Button onClick={this.handleClick}>Click me</Button>
  }
}

class Swal8 extends React.Component {
  handleClick = () => {
    let timerInterval

    swal
      .fire({
        title: "Auto close alert!",
        html: <React.Fragment>"I will close in <b></b> milliseconds."</React.Fragment>,
        timer: 2000,
        timerProgressBar: true,
        onBeforeOpen: () => {
          swal.showLoading()
          timerInterval = setInterval(() => {
            const content = swal.getContent()

            if (content) {
              const b = content.querySelector("b")

              if (b) {
                b.textContent = swal.getTimerLeft()
              }
            }
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      })
      .then(result => {
        if (result.dismiss === swal.DismissReason.timer) {
          console.log("I was closed by the timer")
        }
      })
  }

  render() {
    return <Button onClick={this.handleClick}>Click me</Button>
  }
}

class Swal9 extends React.Component {
  handleClick = () => {
    swal
      .fire({
        title: "Submit your Github username",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Look up",
        showLoaderOnConfirm: true,
        preConfirm: login => {
          return fetch(`https://api.github.com/users/${login}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              swal.showValidationMessage(`Request failed: ${error}`)
            })
        },
        allowOutsideClick: () => !swal.isLoading()
      })
      .then(result => {
        if (result.value) {
          swal.fire({
            title: `${result.value.login}'s avatar`,
            imageUrl: result.value.avatar_url
          })
        }
      })
  }

  render() {
    return <Button onClick={this.handleClick}>Click me</Button>
  }
}

class Swal10 extends React.Component {
  handleClick = () => {
    swal
      .mixin({
        input: "text",
        confirmButtonText: "Next &rarr;",
        showCancelButton: true,
        progressSteps: ["1", "2", "3"]
      })
      .queue([
        {
          title: "Question 1",
          text: "Chaining swal2 modals is easy"
        },
        "Question 2",
        "Question 3"
      ])
      .then(result => {
        if (result.value) {
          const answers = JSON.stringify(result.value)

          swal.fire({
            title: "All done!",
            html: <React.Fragment>Your answers: <pre><code>{answers}</code></pre></React.Fragment>,
            confirmButtonText: "Lovely!"
          })
        }
      })
  }

  render() {
    return <Button onClick={this.handleClick}>Click me</Button>
  }
}

class Swal11 extends React.Component {
  handleClick = () => {
    toast.fire({
      icon: "success",
      title: "Signed in successfully"
    })
  }

  render() {
    return <Button onClick={this.handleClick}>Click me</Button>
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(SweetAlertPage)))
