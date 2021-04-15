import React from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import Row from "./Row";
import Col from "./Col";

class ImageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image || "/images/avatar/blank.webp",
    };
  }
  handleDrop = (dropped) => {
    this.setState({ image: dropped[0] });
  };

  setEditorRef = (editor) => (this.editor = editor);

  getImage = () => {
    const canvas = this.editor.getImageScaledToCanvas().toDataURL();
    return fetch(canvas).then((blob) => {
      this.setState({ image: blob.url });
      return blob.url;
    });
  };

  render() {
    return (
      <Row>
        <Col xs="6">
          <Dropzone
            onDrop={this.handleDrop}
            noClick
            noKeyboard
            style={{ width: "150px", height: "150px" }}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <AvatarEditor
                  ref={this.setEditorRef}
                  width={150}
                  height={150}
                  border="12"
                  scale="1.2"
                  image={this.state.image}
                />
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>
        </Col>
        <Col xs="6">
          {this.state.image && <img src={this.state.image} alt="Preview" />}
        </Col>
      </Row>
    );
  }
}

export default ImageEditor;
