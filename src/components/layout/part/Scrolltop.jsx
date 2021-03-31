import { Scrolltop, Button } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

function ScrollTopComponent(props) {
  return (
    <Scrolltop {...props}>
      <Button icon variant="info" size="lg">
        <FontAwesomeIcon icon={SolidIcon.faAngleUp} />
      </Button>
    </Scrolltop>
  )
}

export default ScrollTopComponent
