import { Card } from "@panely/components";
import CardColumns from "@panely/components/CardColumns";
import { getBadges, getBadgesByUser } from "consumer/journey";

class BadgetListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    if (this.props.journeyId) {
      getBadges(
        this.props.journeyId,
        (data) => {
          this.setState(data);
        },
        () => {}
      );
    } else {
      getBadgesByUser(
        (data) => {
          this.setState(data);
        },
        () => {}
      );
    }
  }
  render() {
    const tolta = this.state.data.length;
    const inComplete = this.state.data.filter(
      (data) => data.disabled === false
    ).length;

    return (
      <div>
        <h4>
          Insignia ({inComplete}/{tolta})
        </h4>
        {this.state.data.length === 0 && (
          <p className="text-center text-muted">Empty badgets</p>
        )}

        <CardColumns columns={5}>
          {this.state.data.map((data) => {
            if (data.disabled) {
              return (
                <Card className="text-center bg-light p-3">
                  <Card.Img
                    top
                    className="bg-white mg-thumbnail avatar-circle p-3 border border-warning"
                    src={data.image}
                    alt="Badget Image"
                  />
                  <Card.Body>
                    <Card.Text>Not available</Card.Text>
                  </Card.Body>
                </Card>
              );
            } else {
              return (
                <Card className="text-center p-3">
                  <Card.Img
                    top
                    className="bg-yellow mg-thumbnail avatar-circle p-3 border border-success"
                    src={data.image}
                    title={data.description}
                    alt="Badget Image"
                  />
                  <Card.Body>
                    <Card.Text>{data.name}</Card.Text>
                  </Card.Body>
                </Card>
              );
            }
          })}
        </CardColumns>
      </div>
    );
  }
}

export default BadgetListComponent;
