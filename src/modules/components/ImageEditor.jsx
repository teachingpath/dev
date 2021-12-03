import React from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import { firebaseClient } from "components/firebase/firebaseClient";

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

  getImage = (path) => {
    try {
      const canvas = this.editor.getImageScaledToCanvas().toDataURL();
      const storageRef = firebaseClient.storage().ref();
      const imagesRef = storageRef.child(path);
      return fetch(canvas).then(res => res.blob()).then(blob => {
        return imagesRef.put(blob).then(function (snapshot) {
          return snapshot.ref.getDownloadURL();
        });
     });
    } catch (error) {
      return Promise.resolve(this.props.image);
    }
  
    
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
  const { handleDrop, width, height, setEditorRef, image, radius } = props;
  return (
    <>
      <Dropzone
        onDrop={handleDrop}
        noClick
        noKeyboard
        style={{ minWidth: width || "150px", minHeight: height || "150px" }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <AvatarEditor
              ref={setEditorRef}
              width={width || 210}
              height={height || 210}
              scale={1.0}
              border={3}
              borderRadius={radius || 0}
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
        }}
      />
      <p>
        <small className="text-muted">
          Tamaño requerido {width || 135}x{height || 135}px. Para crear un{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://badge.design/"
          >
            emblema
          </a>{" "}
          o si necesitas crear un{" "}
          <a
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
