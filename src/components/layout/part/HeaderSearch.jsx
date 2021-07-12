import { Input, InputGroup, Form } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import { useEffect, useState } from "react";

function HeaderSearch() {
  const [query, setQuery] = useState(null);
  useEffect(() => {
    setQuery(Router.query.q);
  }, [query]);
  return (
    <Form className="w-100" action="/catalog">
      <InputGroup icon size="lg" className="widget15-compact">
        <InputGroup.Addon addonType="prepend">
          <FontAwesomeIcon icon={SolidIcon.faSearch} className="text-primary" />
        </InputGroup.Addon>
        <Input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Escribe para buscar..."
        />
      </InputGroup>
    </Form>
  );
}

export default HeaderSearch;
