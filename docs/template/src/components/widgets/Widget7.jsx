import { Row, Col, Portlet, Progress, Widget4 } from "@panely/components"

function Widget7Component() {
  return (
    <Portlet>
      <Portlet.Body>
        <Row>
          <Col sm="6">
            <Widget7Display title="Completed Transactions" highlight="54,234" className="mb-3" />
            <Widget7Display title="New Orders" highlight="242" />
          </Col>
          <Col sm="6">
            <Widget7Display title="Avarage Product Price" highlight="$67,50" className="mb-3" />
            <Widget7Progress title="Satisfication Rate" highlight="90%" progress={90} />
          </Col>
        </Row>
      </Portlet.Body>
    </Portlet>
  )
}

function Widget7Display(props) {
  const { title, highlight, ...attributes } = props

  return (
    <Widget4 {...attributes}>
      <Widget4.Group>
        <Widget4.Display>
          <Widget4.Subtitle children={title} />
          <Widget4.Highlight children={highlight} />
        </Widget4.Display>
      </Widget4.Group>
    </Widget4>
  )
}

function Widget7Progress(props) {
  const { title, highlight, progress, ...attributes } = props

  return (
    <Widget4 {...attributes}>
      <Widget4.Group>
        <Widget4.Display>
          <Widget4.Subtitle children={title} />
        </Widget4.Display>
        <Widget4.Addon>
          <Widget4.Subtitle children={highlight} />
        </Widget4.Addon>
      </Widget4.Group>
      <Progress value={progress} variant="primary" />
    </Widget4>
  )
}

export default Widget7Component
