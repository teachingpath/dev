import { Portlet, Progress, Widget4 } from "@panely/components"

class Widget8Component extends React.Component {
  state = {
    data: [
      {
        title: "New Orders",
        subtitle: "Fresh Order Amount",
        highlight: 523,
        change: 75,
        color: "info"
      },
      {
        title: "New Users",
        subtitle: "Joined New User",
        highlight: 138,
        change: 75,
        color: "success"
      }
    ]
  }

  render() {
    return (
      <Portlet>
        <Portlet.Body>
          {this.state.data.map((data, index) => {
            const { title, subtitle, highlight, change, color } = data

            return (
              <React.Fragment key={index}>
                <Widget4>
                  <Widget4.Group>
                    <Widget4.Display>
                      <Widget4.Title children={title} />
                      <Widget4.Subtitle children={subtitle} />
                    </Widget4.Display>
                    <Widget4.Addon>
                      <Widget4.Highlight className={`text-${color}`} children={highlight} />
                    </Widget4.Addon>
                  </Widget4.Group>
                  <Progress value={change} variant={color} size="sm" />
                  <Widget4.Group>
                    <Widget4.Display>
                      <Widget4.Subtitle>Change</Widget4.Subtitle>
                    </Widget4.Display>
                    <Widget4.Addon>
                      <span className="text-muted" children={`${change}%`} />
                    </Widget4.Addon>
                  </Widget4.Group>
                </Widget4>
                {this.state.data.length - 1 > index ? <hr /> : null}
              </React.Fragment>
            )
          })}
        </Portlet.Body>
      </Portlet>
    )
  }
}

export default Widget8Component
