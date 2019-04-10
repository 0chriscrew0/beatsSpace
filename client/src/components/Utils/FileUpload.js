import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

class FileUpload extends Component {
  state = {
    uploadedFiles: [],
    uploading: false
  };

  onDrop = files => {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };

    formData.append("file", files[0]);

    axios.post("/api/users/upload-files", formData, config).then(response => {
      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data]
        },
        () => {
          this.props.fileHandler(this.state.uploadedFiles);
        }
      );
    });
  };

  showUploadedFiles = () =>
    this.state.uploadedFiles.map(item => (
      <div
        className="mx-2"
        key={item.public_id}
        onClick={() => this.removeFile(item.public_id)}
      >
        {this.props.fileType === "Image(s)" ? (
          <div
            className="dropzone-image"
            style={{
              background: `url(${item.url}) no-repeat`,
              backgroundSize: "contain",
              height: "100px",
              width: "100px"
            }}
          />
        ) : (
          <div>{item.original_filename}</div>
        )}
      </div>
    ));

  removeFile = id => {
    axios.get(`/api/users/remove-file?${id}`).then(response => {
      let files = this.state.uploadedFiles.filter(item => {
        return item.public_id !== id;
      });

      this.setState({ uploadedFiles: files }, () =>
        this.props.fileHandler(files)
      );
    });
  };

  render() {
    return (
      <div className="dropzone">
        <Dropzone onDrop={files => this.onDrop(files)}>
          {({ getRootProps, getInputProps }) => (
            <section className="dropzone-box">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <h6>Upload {this.props.fileType}</h6>
                <i className="fas fa-file-image dropzone-icon" />
                <p className="mb-0 mt-2">
                  Drag file here, or click to select files
                </p>
              </div>
              {this.showUploadedFiles()}
              {this.state.uploading ? <div>loading</div> : null}
            </section>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default FileUpload;
