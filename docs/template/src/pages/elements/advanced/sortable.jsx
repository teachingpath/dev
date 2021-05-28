import { Row, Col, Portlet, RichList, Container } from "@panely/components"
import { ReactSortable } from "react-sortablejs"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class SortablePage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Sortable")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Advanced" },
      { text: "Sortable", link: "/elements/advanced/sortable" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Sortable | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Basic</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Sortable1 />
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Shared lists</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Sortable2 />
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Disabled sorting</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Sortable3 />
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Cloning</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Sortable4 />
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Nested</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Sortable5 />
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

class Sortable1 extends React.Component {
  state = {
    data: [
      { id: 1, title: "List 1", subtitle: "Cras justo odio" },
      { id: 2, title: "List 2", subtitle: "Dapibus ac facilisis in" },
      { id: 3, title: "List 3", subtitle: "Morbi leo risus" }
    ]
  }

  render() {
    return (
      <RichList bordered>
        <ReactSortable list={this.state.data} setList={data => this.setState({ data })}>
          {this.state.data.map((data, index) => {
            const { title, subtitle } = data

            return (
              <RichList.Item key={index}>
                <RichList.Content>
                  <RichList.Title children={title} />
                  <RichList.Subtitle children={subtitle} />
                </RichList.Content>
              </RichList.Item>
            )
          })}
        </ReactSortable>
      </RichList>
    )
  }
}

class Sortable2 extends React.Component {
  state = {
    list1: [
      { id: 1, title: "List 1", subtitle: "Cras justo odio", color: "success" },
      { id: 2, title: "List 2", subtitle: "Dapibus ac facilisis in", color: "success" },
      { id: 3, title: "List 3", subtitle: "Morbi leo risus", color: "success" }
    ],
    list2: [
      { id: 1, title: "List 1", subtitle: "Cras justo odio", color: "danger" },
      { id: 2, title: "List 2", subtitle: "Dapibus ac facilisis in", color: "danger" },
      { id: 3, title: "List 3", subtitle: "Morbi leo risus", color: "danger" }
    ]
  }

  render() {
    return (
      <Row>
        <Col xs="6">
          <RichList bordered>
            <ReactSortable
              group="sortable2"
              list={this.state.list1}
              setList={data => this.setState({ ...this.state, list1: data })}
            >
              {this.state.list1.map((data, index) => {
                const { title, subtitle, color } = data

                return (
                  <RichList.Item key={index}>
                    <RichList.Content>
                      <RichList.Title className={`text-${color}`} children={title} />
                      <RichList.Subtitle children={subtitle} />
                    </RichList.Content>
                  </RichList.Item>
                )
              })}
            </ReactSortable>
          </RichList>
        </Col>
        <Col xs="6">
          <RichList bordered>
            <ReactSortable
              group="sortable2"
              list={this.state.list2}
              setList={data => this.setState({ ...this.state, list2: data })}
            >
              {this.state.list2.map((data, index) => {
                const { title, subtitle, color } = data

                return (
                  <RichList.Item key={index}>
                    <RichList.Content>
                      <RichList.Title className={`text-${color}`} children={title} />
                      <RichList.Subtitle children={subtitle} />
                    </RichList.Content>
                  </RichList.Item>
                )
              })}
            </ReactSortable>
          </RichList>
        </Col>
      </Row>
    )
  }
}

class Sortable3 extends React.Component {
  state = {
    list1: [
      { id: 1, title: "List 1", subtitle: "Cras justo odio", color: "success" },
      { id: 2, title: "List 2", subtitle: "Dapibus ac facilisis in", color: "success" },
      { id: 3, title: "List 3", subtitle: "Morbi leo risus", color: "success" }
    ],
    list2: [
      { id: 1, title: "List 1", subtitle: "Cras justo odio", color: "danger" },
      { id: 2, title: "List 2", subtitle: "Dapibus ac facilisis in", color: "danger" },
      { id: 3, title: "List 3", subtitle: "Morbi leo risus", color: "danger" }
    ]
  }

  render() {
    return (
      <Row>
        <Col xs="6">
          <RichList bordered>
            <ReactSortable
              group={{
                name: "sortable3",
                pull: "clone",
                put: false
              }}
              sort={false}
              list={this.state.list1}
              setList={data => this.setState({ ...this.state, list1: data })}
            >
              {this.state.list1.map((data, index) => {
                const { title, subtitle, color } = data

                return (
                  <RichList.Item key={index}>
                    <RichList.Content>
                      <RichList.Title className={`text-${color}`} children={title} />
                      <RichList.Subtitle children={subtitle} />
                    </RichList.Content>
                  </RichList.Item>
                )
              })}
            </ReactSortable>
          </RichList>
        </Col>
        <Col xs="6">
          <RichList bordered>
            <ReactSortable
              group="sortable3"
              list={this.state.list2}
              setList={data => this.setState({ ...this.state, list2: data })}
            >
              {this.state.list2.map((data, index) => {
                const { title, subtitle, color } = data

                return (
                  <RichList.Item key={index}>
                    <RichList.Content>
                      <RichList.Title className={`text-${color}`} children={title} />
                      <RichList.Subtitle children={subtitle} />
                    </RichList.Content>
                  </RichList.Item>
                )
              })}
            </ReactSortable>
          </RichList>
        </Col>
      </Row>
    )
  }
}

class Sortable4 extends React.Component {
  state = {
    list1: [
      { id: 1, title: "List 1", subtitle: "Cras justo odio", color: "success" },
      { id: 2, title: "List 2", subtitle: "Dapibus ac facilisis in", color: "success" },
      { id: 3, title: "List 3", subtitle: "Morbi leo risus", color: "success" }
    ],
    list2: [
      { id: 1, title: "List 1", subtitle: "Cras justo odio", color: "danger" },
      { id: 2, title: "List 2", subtitle: "Dapibus ac facilisis in", color: "danger" },
      { id: 3, title: "List 3", subtitle: "Morbi leo risus", color: "danger" }
    ]
  }

  render() {
    return (
      <Row>
        <Col xs="6">
          <RichList bordered>
            <ReactSortable
              group={{
                name: "sortable4",
                pull: "clone"
              }}
              list={this.state.list1}
              setList={data => this.setState({ ...this.state, list1: data })}
            >
              {this.state.list1.map((data, index) => {
                const { title, subtitle, color } = data

                return (
                  <RichList.Item key={index}>
                    <RichList.Content>
                      <RichList.Title className={`text-${color}`} children={title} />
                      <RichList.Subtitle children={subtitle} />
                    </RichList.Content>
                  </RichList.Item>
                )
              })}
            </ReactSortable>
          </RichList>
        </Col>
        <Col xs="6">
          <RichList bordered>
            <ReactSortable
              group={{
                name: "sortable4",
                pull: "clone"
              }}
              list={this.state.list2}
              setList={data => this.setState({ ...this.state, list2: data })}
            >
              {this.state.list2.map((data, index) => {
                const { title, subtitle, color } = data

                return (
                  <RichList.Item key={index}>
                    <RichList.Content>
                      <RichList.Title className={`text-${color}`} children={title} />
                      <RichList.Subtitle children={subtitle} />
                    </RichList.Content>
                  </RichList.Item>
                )
              })}
            </ReactSortable>
          </RichList>
        </Col>
      </Row>
    )
  }
}

class Sortable5 extends React.Component {
  state = {
    list: [
      {
        id: "1",
        title: "List 1",
        subtitle: "Cras justo odio",
        child: [
          { id: "1-1", title: "List 1.1", subtitle: "Dapibus ac facilisis in", child: false },
          { id: "1-2", title: "List 1.2", subtitle: "Morbi leo risus", child: false }
        ]
      },
      {
        id: "2",
        title: "List 2",
        subtitle: "Dapibus ac facilisis in",
        child: [
          { id: "2-1", title: "List 2.1", subtitle: "Dapibus ac facilisis in", child: false },
          {
            id: "2-2",
            title: "List 2.2",
            subtitle: "Morbi leo risus",
            child: [{ id: "2-2-1", title: "List 2-2-1", subtitle: "Cras justo odio", child: false }]
          }
        ]
      },
      { id: "3", title: "List 3", subtitle: "Morbi leo risus", child: false },
      { id: "4", title: "List 4", subtitle: "Cras justo odio", child: false }
    ]
  }

  render() {
    return (
      <RichList bordered className="sortable">
        <ReactSortable
          group="sortable5"
          invertSwap={true}
          list={this.state.list}
          setList={data => this.setState({ list: data })}
        >
          {this.state.list.map((data, index1) => {
            const { title, subtitle, child } = data
            const hasChild = Boolean(child)
            let listState = this.state.list

            return (
              <div className="sortable-item" key={index1}>
                <RichList.Item>
                  <RichList.Content>
                    <RichList.Title children={title} />
                    <RichList.Subtitle children={subtitle} />
                  </RichList.Content>
                </RichList.Item>
                {hasChild ? (
                  <RichList bordered className="sortable">
                    <ReactSortable
                      group="sortable5"
                      invertSwap={true}
                      list={this.state.list[index1].child}
                      setList={data => {
                        listState[index1].child = data
                        this.setState({ list: listState })
                      }}
                    >
                      {child.map((data, index2) => {
                        const { title, subtitle, child } = data
                        const hasChild = Boolean(child)

                        return (
                          <div className="sortable-item" key={index2}>
                            <RichList.Item>
                              <RichList.Content>
                                <RichList.Title children={title} />
                                <RichList.Subtitle children={subtitle} />
                              </RichList.Content>
                            </RichList.Item>
                            {hasChild ? (
                              <RichList bordered className="sortable">
                                <ReactSortable
                                  group="sortable5"
                                  invertSwap={true}
                                  list={this.state.list[index1].child[index2].child}
                                  setList={data => {
                                    listState[index1].child[index2].child = data
                                    this.setState({ list: listState })
                                  }}
                                >
                                  {child.map((data, index3) => {
                                    const { title, subtitle } = data

                                    return (
                                      <div className="sortable-item" key={index3}>
                                        <RichList.Item>
                                          <RichList.Content>
                                            <RichList.Title children={title} />
                                            <RichList.Subtitle children={subtitle} />
                                          </RichList.Content>
                                        </RichList.Item>
                                      </div>
                                    )
                                  })}
                                </ReactSortable>
                              </RichList>
                            ) : null}
                          </div>
                        )
                      })}
                    </ReactSortable>
                  </RichList>
                ) : null}
              </div>
            )
          })}
        </ReactSortable>
      </RichList>
    )
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(SortablePage)))
