import { Input, InputGroup } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

function HeaderSearch() {
  return (
    <InputGroup icon size="lg" className="widget15-compact">
      <InputGroup.Addon addonType="prepend">
        <FontAwesomeIcon icon={SolidIcon.faSearch} className="text-primary" />
      </InputGroup.Addon>
      <Input type="text" placeholder="Type to search..." />
    </InputGroup>
  )
}

export default HeaderSearch
