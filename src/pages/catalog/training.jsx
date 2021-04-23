
import Steps from "rc-steps";
import Button from "@panely/components/Button";


class Training extends React.Component {
  state = { current: 0 };
  render() {
    const {
      data: { training },
    } = this.props;
    return (
      <Steps current={this.state.current} direction="vertical">
        {training?.map((item, index) => {
          return (
            <Steps.Step
              key={index}
              title={"Step#" + (index + 1)}
              description={
                <>
                  <div dangerouslySetInnerHTML={{ __html: item.name }} />
                  {this.state.current === index && (
                    <Button
                      onClick={() => {
                        this.setState({ current: this.state.current + 1 });
                      }}
                    >
                      Done
                    </Button>
                  )}
                </>
              }
            />
          );
        })}
      </Steps>
    );
  }
}

export default Training;
