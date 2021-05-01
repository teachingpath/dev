import {Portlet, Widget10, Widget8} from "@panely/components"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import {firestoreClient} from "../firebase/firebaseClient";

class InfoPanelComponent extends React.Component {
    state = {
        data: [
            {
                title: "100%",
                subtitle: "Popularity",
                avatar: () => (
                    <Widget8.Avatar display circle variant="label-primary" className="m-0">
                        <FontAwesomeIcon icon={SolidIcon.faRocket}/>
                    </Widget8.Avatar>
                )
            },
            {
                title: "0",
                subtitle: "Trainees running",
                avatar: () => (
                    <Widget8.Avatar display circle variant="label-success" className="m-0">
                        <FontAwesomeIcon icon={SolidIcon.faRunning}/>
                    </Widget8.Avatar>
                )
            },
            {
                title: "0",
                subtitle: "Trainees finished",
                avatar: () => (
                    <Widget8.Avatar display circle variant="label-danger" className="m-0">
                        <FontAwesomeIcon icon={SolidIcon.faCheck}/>
                    </Widget8.Avatar>
                )
            }
        ]
    }

    componentDidMount() {
        firestoreClient
            .collection("pathways")
            .where("leaderId", "==", this.props.firebase.user_id)
            .get()
            .then((querySnapshot) => {
                const list = [];
                querySnapshot.forEach((doc) => {
                    list.push(doc.id);
                });
                firestoreClient
                    .collection("journeys")
                    .where("pathwayId", "in", list)
                    .get()
                    .then((querySnapshot) => {
                        const finisheds = [];
                        const inRunning = [];
                        querySnapshot.forEach(async (doc) => {
                            const data = doc.data();
                            if(data.progress >= 100){
                                finisheds.push(data);
                            } else {
                                inRunning.push(data);
                            }
                        });
                        const data = this.state.data;
                        data[1].title = inRunning.length;
                        data[2].title = finisheds.length;

                        this.setState({
                          data: data
                        })
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    render() {
        return (
            <Portlet>
                <Widget10 vertical="md">
                    {this.state.data.map((data, index) => {
                        const {title, subtitle, avatar: WidgetAvatar} = data

                        return (
                            <Widget10.Item key={index}>
                                <Widget10.Content>
                                    <Widget10.Title children={title}/>
                                    <Widget10.Subtitle children={subtitle}/>
                                </Widget10.Content>
                                <Widget10.Addon>
                                    <WidgetAvatar/>
                                </Widget10.Addon>
                            </Widget10.Item>
                        )
                    })}
                </Widget10>
            </Portlet>
        )
    }
}

export default InfoPanelComponent
