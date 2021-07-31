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
                getImage={this.getImage}
              />
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
        style={{ maxWidth: width || "150px", maxHeight: height || "150px" }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <AvatarEditor
              ref={setEditorRef}
              width={width || 180}
              height={height || 180}
              scale={1.0}
              border={5}
              className="mg-thumbnail"
              image={image}
            />
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={(e) => {
          handleDrop(e.target.files);
          getImage().then();
        }}
      />
      <p>
        <small className="text-muted">
          Tamaño requerido {width || 135}x{height || 135}px. 
          {" "}
          Para crear un   {" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://badge.design/"
          >
            emblema
          </a> o si necesitas crear un    {" "}<a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.canva.com/"
          >
            banner
          </a>
        </small>
      </p>
    </>
  );
};

export default ImageEditor;
