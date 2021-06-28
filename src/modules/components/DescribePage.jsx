import { useState } from "react";
import Card from "./Card";
import Link from "next/link";

const DescribeURL = ({ url }) => {
  const [data, setData] = useState(null);
  if (data == null || data.metadata.website !== url) {
    fetch("/api/metadata/?url=" + url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }
  return !data ? (
    <p>Loading</p>
  ) : (
    <Card>
      <Card.Body>
        {data.favicons[0] && (
          <Card.Icon>
            <img
              src={(() => {
                const r = data.favicons.filter((d) => !d.includes(".ico"));
                return r.length > 0 ? r[0] : data.favicons[0];
              })()}
              width="35"
              className="avatar-circle"
              alt="Card Image"
            ></img>
          </Card.Icon>
        )}

        <Card.Title tag="h3">
          <Link
            href={data.metadata.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.metadata.title}
          </Link>
        </Card.Title>
        <Card.Text>{data.metadata.description}</Card.Text>
        <Card.Link
          href={data.metadata.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          Show more
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default DescribeURL;
