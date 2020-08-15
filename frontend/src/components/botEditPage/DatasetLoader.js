import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import * as Papa from "papaparse";
import {
  loadHeaderAction,
  ChangeHeaderAction,
  clearDatasetAction,
  loadDatasetProperties,
} from "../../Store/actions";
import { ModalContext } from "../../context/ModalContext";

class DatasetLoader extends Component {
  static contextType = ModalContext;
  changestatus = (index) => {
    this.props.changeHeader(index);
  };

  fileperse = (file) => {
    let data = file[0];
    let headers = null;
    Papa.parse(data, {
      complete: (results) => {
        headers = results.data[0];
        this.props.loadHeaders(headers, data.path);
        let properties = file[0];
        properties["rowNumber"] = results.data.length - 2; //papa parse adds 2 extra row
        this.props.loadDatasetProperties(properties);
      },
    });
  };

  openDatasetPropertiesModal = (processId) =>
    this.context.setCurrentModal({
      name: "DatasetPropModal",
      props: {
        datasetProperties: this.props.datasetProperties,
      },
    });

  render() {
    if (this.props.headers.length === 0) {
      return (
        <div>
          <Dropzone
            accept=".csv"
            onDrop={(acceptedFiles) => this.fileperse(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Card style={{ height: "70vh", paddingTop: "22vh" }}>
                    <div className="text-center">
                      <label className="h2 text-center mb-4">
                        No Dataset Selected
                      </label>
                      <p>
                        Drag & drop some files here, or click to select files
                      </p>
                    </div>
                  </Card>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      );
    } else {
      return (
        <div>
          <Card>
            <div style={{ margin: "3vh", textAlign: "center" }}>
              <span>
                <i
                  className="ml-4 fas fa-info-circle float-right fa-2x"
                  onClick={this.openDatasetPropertiesModal}
                ></i>
              </span>
              <span>
                <i
                  className="fas fa-undo-alt float-right fa-2x"
                  onClick={() => {
                    this.props.clearDataset();
                  }}
                ></i>
              </span>
              <h2 className="mb-4">DataSet Columns</h2>
              {this.props.headers.map((header, index) => {
                if (this.props.status[index] === "notSelected") {
                  return (
                    <div key={index}>
                      <h3>
                        <button
                          onClick={() => this.changestatus(index)}
                          className=" btn btn-danger btn-lg text-center"
                        >
                          {index + 1}. {header}
                        </button>
                      </h3>
                    </div>
                  );
                } else if (this.props.status[index] === "changing") {
                  return (
                    <div key={index}>
                      <h3>
                        <button
                          onClick={() => this.changestatus(index)}
                          className="btn btn-warning btn-lg text-center"
                        >
                          {index + 1}. {header}
                        </button>
                      </h3>
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      <h3>
                        <button
                          onClick={() => this.changestatus(index)}
                          className="btn btn-success btn-lg text-center"
                        >
                          {index + 1}. {header}
                        </button>
                      </h3>
                    </div>
                  );
                }
              })}
            </div>
          </Card>
          {/* <Card>
            {this.props.datasetProperties ? (
              <div className="card-body">
                <h4 className="mt-0 header-title">Dataset Properties</h4>
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th>File Type</th>
                        <th>File Size</th>
                        <th>Number of Rows</th>
                        <th>Path</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.props.datasetProperties.type}</td>
                        <td>{this.props.datasetProperties.size / 1000} MB</td>
                        <td>{this.props.datasetProperties.rowNumber}</td>
                        <td>{this.props.datasetProperties.path}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </Card> */}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    datasets: state.datasets,
    headers: state.headers,
    status: state.status,
    filepath: state.filepath,
    datasetProperties: state.datasetProperties,
  };
};
const mapDispathtoProps = (dispatch) => {
  return {
    loadHeaders: (headers, path) => {
      dispatch(loadHeaderAction(headers, path));
    },
    changeHeader: (index) => {
      dispatch(ChangeHeaderAction(index));
    },
    clearDataset: () => {
      dispatch(clearDatasetAction());
    },
    loadDatasetProperties: (properties) => {
      dispatch(loadDatasetProperties(properties));
    },
  };
};

export default connect(mapStateToProps, mapDispathtoProps)(DatasetLoader);
