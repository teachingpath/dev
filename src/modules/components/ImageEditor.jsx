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
        {this.props.withPreview ? (
          <>
            <Col xs="6">
              <DropDownImage
                {...this.props}
                {...this.state}
                setEditorRef={this.setEditorRef}
                handleDrop={this.handleDrop}
              />
            </Col>
            <Col xs="6">
              {this.state.image && (
                <img
                  src={this.state.image}
                  alt="Preview"
                  className="mx-auto d-block mg-thumbnail avatar-circle"
                />
              )}
            </Col>
          </>
        ) : (
          <Col xs="12">
            <DropDownImage
              {...this.props}
              {...this.state}
              setEditorRef={this.setEditorRef}
              handleDrop={this.handleDrop}
            />{" "}
          </Col>
        )}
      </Row>
    );
  }
}

const DropDownImage = (props) => {
  const { handleDrop, width, height, setEditorRef, image } = props;
  return (
    <Dropzone
      onDrop={handleDrop}
      noClick
      noKeyboard
      style={{ width: width || "120px", height: height || "120px" }}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <AvatarEditor
            ref={setEditorRef}
            width={width || 125}
            height={height || 125}
            scale="1.2"
            className="mx-auto d-block mg-thumbnail"
            image={image}
          />
          <input {...getInputProps()} />
        </div>
      )}
    </Dropzone>
  );
};

export default ImageEditor;
