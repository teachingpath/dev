import Card from "@panely/components/Card";

class Hacking extends React.Component {
    render() {
        const {
            data,
        } = this.props;
        return (
            <>
                <Card>
                    <Card.Header>Guidelines</Card.Header>
                    <Card.Body>
                        <Card.Subtitle>Take into account the following guide to carry out the hacking</Card.Subtitle>
                        <Card.Text>
                            <div
                                dangerouslySetInnerHTML={{ __html: data.guidelines }}
                            />
                        </Card.Text>
                    </Card.Body>
                </Card>
                
                <Card className="mt-3">
                    <Card.Header>Criteria</Card.Header>
                    <Card.Body>
                        <Card.Subtitle>Hacking should be assessed as follows:</Card.Subtitle>
                        <Card.Text>
                            <div
                                dangerouslySetInnerHTML={{ __html: data.criteria }}
                            />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>

        );
    }
}

export default Hacking;
