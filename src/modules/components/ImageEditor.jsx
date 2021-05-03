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
    const { width, height } = this.props;

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
                getImage={this.getImage}
              />
            </Col>
            <Col xs="6" >
              <br />
              <p>
                {this.state.image && (
                  <img
                    src={this.state.image}
                    alt="Preview"
                    className=" mg-thumbnail avatar-circle"
                  />
                )}
              </p>
              <p className="text-muted"> 
                Preview image to save
              </p>

            </Col>
          </>
        ) : (
          <Col xs="12">
            <DropDownImage
              {...this.props}
              {...this.state}
              setEditorRef={this.setEditorRef}
              handleDrop={this.handleDrop}
              getImage={this.getImage}
            />{" "}
          </Col>
        )}
      </Row>
    );
  }
}

const DropDownImage = (props) => {
  const { handleDrop, width, height, setEditorRef, image, getImage } = props;
  return (
    <>
      <Dropzone
        onDrop={handleDrop}
        noClick
        noKeyboard
        style={{ maxWidth: width || "120px", maxHeight: height || "120px" }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <AvatarEditor
              ref={setEditorRef}
              width={width || 125}
              height={height || 125}
              scale={1.1}
              border={10}
              className="mg-thumbnail"
              image={image}
            />
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      <input type="file" name="image" accept="image/*" onChange={(e) => {
        handleDrop(e.target.files);
        getImage().then();
      }} />
      <p>
        <small className="text-muted">Required image size  {width || 125}x{height || 125}px</small>
      </p>
    </>
  );
};

export default ImageEditor;
