import { Avatar, Button, Portlet, RichList } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

class Widget15Component extends React.Component {
  state = {
    data: [
      {
        image: "/images/avatar/blank.webp",
        name: "Airi Satou",
        job: "Accountant",
        link: "#",
        feed: () => (
          <React.Fragment>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem optio libero
            deleniti minus culpa modi, quam rem eius quaerat aut.
          </React.Fragment>
        )
      },
      {
        image: "/images/avatar/blank.webp",
        name: "Cedric Kelly",
        job: "Senior Javascript Developer",
        link: "#",
        feed: () => (
          <React.Fragment>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus non, in, culpa libero
            quidem consequatur.
          </React.Fragment>
        )
      },
      {
        image: "/images/avatar/blank.webp",
        name: "Brielle Williamson",
        job: "Integration Specialist",
        link: "#",
        feed: () => (
          <React.Fragment>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae nesciunt blanditiis
            tempora eius accusamus, libero facere amet! Neque quis odio dicta dolor, eaque
            consectetur. Nihil?
          </React.Fragment>
        )
      },
      {
        image: "/images/avatar/blank.webp",
        name: "Sonya Frost",
        job: "Software Engineer",
        link: "#",
        feed: () => (
          <React.Fragment>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita praesentium rem aut
            aliquam perferendis harum molestiae cum beatae, perspiciatis, at nisi reprehenderit
            minus voluptatibus veritatis. Iste laborum possimus nobis vero?
          </React.Fragment>
        )
      }
    ]
  }

  render() {
    return (
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faUserTag} />
          </Portlet.Icon>
          <Portlet.Title>User feeds</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Rich List */}
          <RichList flush>
            {this.state.data.map((data, index) => {
              const { image, name, job, link, feed: Feed } = data

              return (
                <RichList.Item key={index} className="flex-column align-items-stretch">
                  <RichList.Item className="p-0">
                    <RichList.Addon addonType="prepend">
                      {/* BEGIN Avatar */}
                      <Avatar display>
                        <img src={image} alt="Avatar image" />
                      </Avatar>
                      {/* END Avatar */}
                    </RichList.Addon>
                    <RichList.Content>
                      <RichList.Title children={name} />
                      <RichList.Subtitle children={job} />
                    </RichList.Content>
                    <RichList.Addon addonType="append">
                      <Link href={link}>
                        <Button variant="label-primary">Follow</Button>
                      </Link>
                    </RichList.Addon>
                  </RichList.Item>
                  <p className="text-justify mb-0 mt-2">
                    <Feed />
                  </p>
                </RichList.Item>
              )
            })}
          </RichList>
          {/* END Rich List */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

export default Widget15Component
