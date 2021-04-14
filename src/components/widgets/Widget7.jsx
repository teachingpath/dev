import { Row, Col, Portlet, Progress, Widget4 } from "@panely/components"

function Widget7Component() {
  return (
    <Portlet>
      <Portlet.Body>
      <Row>
         
         <Col sm="6">
             <Widget7Display title="Hacking track" highlight="3" className="mb-3" />
             <Widget7Display title="Training track" highlight="10" />
           </Col>
           <Col sm="6">
             <Widget7Display title="Learning track" highlight="3" className="mb-3" />
             <Widget7Display title="Q&A track" highlight="10" />
           </Col>
         </Row>
        <Row>
         
          <Col sm="6">
            <Widget7Display title="Bonuses delivered" highlight="5,434" className="mb-3" />
            <Widget7Display title="Pathways completed" highlight="242" />
          </Col>
          <Col sm="6">
            <Widget7Display title="Badges delivered" highlight="20" className="mb-3" />
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
