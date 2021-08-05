import { useState } from "react";
import Card from "./Card";
import Link from "next/link";
import { useEffect } from "react";

const DescribeURL = ({ url }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api/metadata/?url=" +encodeURI(url))
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [url]);

  return !data ? (
    <p>Loading</p>
  ) : (
    <Card>
      <Card.Body>
        {data.icon && (
          <Card.Icon>
            <img
              src={data.icon}
              width="35"
              className="avatar-circle"
              alt={data.provider}
            ></img>
          </Card.Icon>
        )}
          <span className="ml-4">{data.provider}</span> 
        <Card.Title tag="h3">
          <Card.Link href={data.url} target="_blank" rel="noopener noreferrer">
            {data.title}
          </Card.Link>
        </Card.Title>
        <Card.Text>{data.description}</Card.Text>
        <Card.Link href={data.url} target="_blank" rel="noopener noreferrer">
          Ir a la referencia
        </Card.Link>
        <Card.Text>{data.url}</Card.Text>
        {data.image && <img src={data.image} alt="Card Image"></img>}
      </Card.Body>
    </Card>
  );
};

export default DescribeURL;
