import {Table, Avatar, Marker, Portlet, Progress, AvatarGroup, Widget4 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

class Widget4Component extends React.Component {
  state = {
    data: [
      {
        id: "837563",
        statusColor: "primary",
        statusInfo: "Arrived",
        operatorImages: [
          "/images/avatar/blank.webp",
          "/images/avatar/blank.webp",
          "/images/avatar/blank.webp",
          "/images/avatar/blank.webp",
          "/images/avatar/blank.webp"
        ],
        location: "Tokyo",
        progress: 90,
        startDate: "26/06/2020",
        endDate: "27/06/2020"
      },
      {
        id: "982365",
        statusColor: "danger",
        statusInfo: "Pending",
        operatorImages: [
          "/images/avatar/blank.webp",
          "/images/avatar/blank.webp",
          "/images/avatar/blank.webp"
        ],
        location: "San Francisco",
        progress: 20,
        startDate: "23/04/2020",
        endDate: "28/04/2020"
      },
      {
        id: "872048",
        statusColor: "success",
        statusInfo: "Moving",
        operatorImages: [
          "/images/avatar/blank.webp",
          "/images/avatar/blank.webp",
          "/images/avatar/blank.webp",
          "/images/avatar/blank.webp"
        ],
        location: "Edinburgh",
        progress: 75,
        startDate: "26/04/2020",
        endDate: "30/04/2020"
      },
      {
        id: "324712",
        statusColor: "warning",
        statusInfo: "Hold",
        operatorImages: [
          "/images/avatar/blank.webp",
          "/images/avatar/blank.webp",
          "/images/avatar/blank.webp"
        ],
        location: "Tokyo",
        progress: 30,
        startDate: "26/06/2020",
        endDate: "30/06/2020"
      },
      {
        id: "128747",
        statusColor: "success",
        statusInfo: "Moving",
        operatorImages: [
          "/images/avatar/blank.webp",
          "/images/avatar/blank.webp",
          "/images/avatar/blank.webp",
          "/images/avatar/blank.webp"
        ],
        location: "New York",
        progress: 60,
        startDate: "10/05/2020",
        endDate: "15/05/2020"
      }
    ]
  }

  render() {
    return (
      <Portlet>
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faTruckLoading} />
          </Portlet.Icon>
          <Portlet.Title>Order progress</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Table */}
          <Table responsive="md" className="text-nowrap mb-0">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Operators</th>
                <th>Location</th>
                <th>Progress</th>
                <th>Start date</th>
                <th>Estimation</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((data, index) => {
                const { id, statusColor, statusInfo, location, progress, startDate, endDate } = data

                return (
                  <tr key={index}>
                    <td className="align-middle" children={id} />
                    <td className="align-middle">
                      <Marker type="dot" variant={statusColor} />
                      {statusInfo}
                    </td>
                    <td className="align-middle">
                      {/* BEGIN Avatar Group */}
                      <AvatarGroup>
                        {data.operatorImages.map((image, index) => (
                          <Avatar key={index} circle display>
                            <img src={image} alt="Avatar image" />
                          </Avatar>
                        ))}
                      </AvatarGroup>
                      {/* END Avatar Group */}
                    </td>
                    <td className="align-middle" children={location} />
                    <td className="align-middle">
                      {/* BEGIN Widget */}
                      <Widget4>
                        <Widget4.Group>
                          <Widget4.Display>
                            <Widget4.Subtitle children={`${progress}%`} />
                          </Widget4.Display>
                        </Widget4.Group>
                        <Progress value={progress} variant="primary" size="sm" />
                      </Widget4>
                      {/* END Widget */}
                    </td>
                    <td className="align-middle" children={startDate} />
                    <td className="align-middle" children={endDate} />
                  </tr>
                )
              })}
            </tbody>
          </Table>
          {/* END Table */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

export default Widget4Component
