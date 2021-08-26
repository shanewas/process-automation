import React, { Component } from "react";
import moment from "moment";
import * as electron from "../../electronScript";
import { connect } from "react-redux";
import { loadBotAction, loadDatasetProperties } from "../../Store/actions";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalContext } from "../../context/ModalContext";

class BotTable extends Component {
  static contextType = ModalContext;
  state = {
    botList: [],
    build: false,
    botSearch: "",
    sortDesc: false,
  };

  buildbot = (botName) => {
    let process;
    let iteration;
    let variables;
    let filepath;
    let status;
    let header;
    Promise.all([
      electron.ipcRenderer.invoke("get-process", botName).then((data) => {
        if (data) process = data;
        else process = [];
      }),
      electron.ipcRenderer.invoke("bot-name", botName).then((data) => {
        iteration = data.botIteration;
        variables = data.variables;
        filepath = data.filepath;
        status = data.status;
        header = data.header;
      }),
    ]).then(() => {
      let bot = {};
      bot["filepath"] = filepath;
      bot["botName"] = botName;
      bot["status"] = status;
      bot["header"] = header;
      bot["variables"] = variables;
      bot["process"] = process;
      bot["iteration"] = iteration;
      this.props.loadBot(bot);
      this.setState({
        build: true,
      });
    });
  };
  startbot = (botName) => {
    if (navigator.onLine) {
      electron.ipcRenderer.send(electron.startBotChannel, botName);
      this.updatetable();
    } else {
      toast.warning("No internet connection", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  badgemaker = (status) => {
    switch (status) {
      case "running":
        return "badge badge-warning";
      case "active":
        return "badge badge-success";
      case "disabled":
        return "badge badge-danger";
      default:
        return "badge badge-success";
    }
  };

  // updatetable = () => {
  //   electron.ipcRenderer.invoke("bots").then((result) => {
  //     this.setState({
  //       botList: result,
  //     });
  //   });
  // };

  exportBot = (botName) => {
    electron.ipcRenderer.send(electron.exportBot, botName);
  };

  // importBot = () => {
  //   electron.ipcRenderer.send(electron.importBot);
  // };

  // componentDidMount() {
  //   this.updatetable();
  //   electron.ipcRenderer.on("import-complete", (event) => {
  //     this.updatetable();
  //   });
  // }

  handleSearchChange = (e) => this.setState({ botSearch: e.target.value });
  handleSearchSort = (_) =>
    this.setState((prev) => ({ sortDesc: !prev.sortDesc }));

  handleBotDelete = (botName) => {
    electron.ipcRenderer.send(electron.deleteBotChannel, botName);
    this.updatetable();
  };

  render() {
    if (this.state.build) {
      return <Redirect to="/build"></Redirect>;
    }
    const { setCurrentModal } = this.context;
    return (
      <div className="row">
        <ToastContainer style={{ fontWeight: "bolder" }} />
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <button
                className="btn btn-primary btn-sm ml-3"
                style={{ float: "right" }}
                onClick={() => {
                  this.importBot();
                }}
              >
                <i className="fas fa-upload"></i> Import
              </button>
              <h4 className="mt-0 header-title mb-4 ">
                Bot List<span></span>
              </h4>
              <input
                className="input-field mr-4"
                onChange={this.handleSearchChange}
                placeholder="Search Bot"
              />
              <span className="flex">
                <span className="mr-2">Sort by Last</span>
                <input
                  type="checkbox"
                  onChange={this.handleSearchSort}
                  checked={this.state.sortDesc}
                />
              </span>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Last Active</th>
                      <th scope="col">Functions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.botList
                      .filter(
                        (b) =>
                          this.state.botSearch === "" ||
                          b.botName
                            .toLowerCase()
                            .includes(this.state.botSearch.toLowerCase())
                      )
                      .sort((a, b) => {
                        const f = moment(
                          a.lastActive,
                          "MMMM Do YYYY at H:mm:ss a"
                        );
                        const s = moment(
                          b.lastActive,
                          "MMMM Do YYYY at H:mm:ss a"
                        );
                        const isSorted = this.state.sortDesc;
                        return moment(f).isBefore(s)
                          ? isSorted
                            ? -1
                            : 1
                          : isSorted
                          ? 1
                          : -1;
                      })
                      .map((bot, i) => (
                        <tr key={i}>
                          <td>{bot.botName}</td>
                          {/* <td>
                  <span className={this.badgemaker(bot.status)}>{bot.status}</span>
                </td>
                <td>{bot.category}</td>
                <td>{bot.runTime}</td> */}
                          {/* MMMM Do YYYY at H:mm:ss a */}
                          <td>{moment(bot.lastActive).fromNow()}</td>
                          <td>
                            <div>
                              <div className="btn btn-primary mr-2 btn-sm">
                                <div
                                  onClick={() => {
                                    this.buildbot(bot.botName);
                                  }}
                                >
                                  <i className="fas fa-hammer"></i> Edit
                                </div>
                              </div>
                              <div className="btn btn-success mr-2 btn-sm">
                                <div onClick={() => this.startbot(bot.botName)}>
                                  <i className="fas fa-running"></i> Start
                                </div>
                              </div>
                              <div className="btn btn-danger mr-2 btn-sm">
                                <div
                                  onClick={() =>
                                    setCurrentModal({
                                      name: "BotDeleteModal",
                                      props: {
                                        onBotDelete: () =>
                                          this.handleBotDelete(bot.botName),
                                        bot,
                                      },
                                    })
                                  }
                                >
                                  <i className="far fa-trash-alt"></i> Delete
                                </div>
                              </div>
                              <div className="btn btn-warning mr-2 btn-sm">
                                <div
                                  onClick={() => {
                                    this.exportBot(bot.botName);
                                  }}
                                >
                                  <i className="fa fa-download"></i> Export
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispathtoProps = (dispatch) => {
  return {
    loadBot: (bot) => {
      dispatch(loadBotAction(bot));
    },
    loadDatasetProperties: (properties) => {
      dispatch(loadDatasetProperties(properties));
    },
  };
};

export default connect(null, mapDispathtoProps)(BotTable);
