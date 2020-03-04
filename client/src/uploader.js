import React from 'react';
import * as axios from 'axios';

export default class Uploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      files: null,
    };
  }

  handleSingleChange = e => {
    console.log(e.target.files.length);
    this.setState({
      file: e.target.files[0],
    });
  };

  handleSingleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', this.state.file);

    const config = {
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        console.log(percentCompleted);
      },
    };

    const result = await axios.post('/files/single', formData, config);
    console.log(result.data);
  };

  handleMultipleChange = e => {
    console.log(e.target.files.length);
    this.setState({
      files: e.target.files,
    });
  };

  handleMultipleSubmit = async () => {
    const formData = new FormData();
    for (const key of Object.keys(this.state.files)) {
      formData.append('files', this.state.files[key]);
    }

    const result = await axios.post('/files/multiple', formData);
    console.log(result.data);
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <label htmlFor="file">single file</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={this.handleSingleChange}
            ></input>
          </div>
          <div>
            <button onClick={this.handleSingleSubmit}>Submit</button>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="files">multiple files</label>
            <input
              type="file"
              id="files"
              name="files"
              multiple
              onChange={this.handleMultipleChange}
            ></input>
          </div>
          <div>
            <button onClick={this.handleMultipleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}
