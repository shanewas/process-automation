import React, { Component } from "react";
import Navbarup from "../navBar/Navbarup";
import SidebarLeft from "../navBar/SidebarLeft";
import SearchBar from "./SearchBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Flowchart from "./Flowchart";
import DatasetLoader from "./DatasetLoader";
import { connect } from "react-redux";
// import SelectBotModal from "./SelectBotModal";
import {
  selectBotAction,
  clearAllAction,
  editProcessAction,
} from "../../Store/actions";
import { SeleniumCode } from "../../CodeGeneration";
import * as electron from "../../electronScript";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalContext } from "../../context/ModalContext";
import WarningsDrawer from "./WarningsDrawer";
import checkBot from "./checkBot";

class BotBuildPage extends Component {
  static contextType = ModalContext;
  state = {
    // selectmodalShow: false,
    // codeGenerationModal: false,
    // code: "",
    changed: false,
    warningsDrawer: false,
    warnings: {},
    activeWarning: "",
  };

  showWarnings = () => this.setState({ warningsDrawer: true });
  hideWarnings = () => this.setState({ warningsDrawer: false });
  onWarningHover = (id) => this.setState({ activeWarning: id });
  onWarningHoverOut = () => this.setState({ activeWarning: "" });
  removeWarningOnProcessUpdate = (id) => {
    const warnings = { ...this.state.warnings };
    delete warnings[id];
    const isLast = !Object.keys(warnings).length;
    this.setState({
      warnings,
      ...(isLast && { warningsDrawer: false }),
    });
  };
  openProcessConfigModal = (processId) =>
    this.context.setCurrentModal({
      name: "ProcessConfigModal",
      props: {
        editStep: (process) => {
          this.removeWarningOnProcessUpdate(processId);
          this.props.editProcess(
            process,
            this.props.process.findIndex((p) => p.id === processId)
          );
        },
        currentProcess: this.props.process.find((p) => p.id === processId),
        variables: this.props.variables,
        headers: this.props.headers,
      },
    });

  // savebot = () => {
  //   this.setState({ selectmodalShow: true });
  // };

  openGenerateCodeModal = () => {
    var code = SeleniumCode(
      this.props.process,
      this.props.botIteration,
      this.props.filepath
    );
    this.context.setCurrentModal({
      name: "GenerateCodeModal",
      props: {
        code,
        saveCode: () => electron.ipcRenderer.send("code-generation", code),
      },
    });
  };

  openBotSaveModal = async () => {
    const warnings = checkBot({
      processes: this.props.process,
      headers: this.props.headers,
      fpg: this.props.fpg,
    });
    if (Object.keys(warnings).length) {
      this.context.setCurrentToastr({
        msg: "Could not save, please fix the warnings",
      });
      return this.setState({ warnings });
    }
    // currently we're saving bots with name attr, [FUTURE] need to change it to Id
    const tBots = await electron.ipcRenderer.invoke("bots");
    const bots = tBots.map((b) => b.botName);
    this.context.setCurrentModal({
      name: "BotSaveModal",
      props: {
        bots,
        addBot: async ({ name, category }) => {
          await electron.ipcRenderer.invoke("add-bot", name, category);
          await this.selectBot(name);
        },
        saveExisting: this.selectBot,
      },
    });
  };

  selectBot = (botName) => {
    let saveBotObject = {};
    saveBotObject.botName = botName;
    saveBotObject.filepath = this.props.filepath;
    saveBotObject.variables = this.props.variables;
    saveBotObject.headers = this.props.headers;
    saveBotObject.status = this.props.status;
    saveBotObject.botIteration = this.props.botIteration;
    saveBotObject.downloadPath = this.props.downloadPath;
    saveBotObject.uploadPath = this.props.uploadPath;
    saveBotObject.screenshotPath = this.props.screenshotPath;
    saveBotObject.ocrPath = this.props.ocrPath;
    let process = this.props.process;
    electron.ipcRenderer.send("update-bot-process", botName, process);
    electron.ipcRenderer.send("update-bot", botName, saveBotObject);
    this.botChanged(false);
  };

  botChanged = (change) => {
    this.setState({
      saved: change,
    });
  };
  runBot = () => {
    if (!this.state.changed) {
      electron.ipcRenderer.send(electron.startBotChannel, this.props.botName);
    } else {
      toast.info("Please Save Bot First", {
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
  ocr = () => {
    electron.ipcRenderer.send(electron.ocrEngine);
  };
  componentWillUnmount() {
    this.props.clearProcess();
  }

  render() {
    return (
      <div>
        <WarningsDrawer
          open={this.state.warningsDrawer}
          warnings={this.state.warnings}
          hideWarnings={this.hideWarnings}
          onWarningHover={this.onWarningHover}
          onWarningHoverOut={this.onWarningHoverOut}
          openProcessConfigModal={this.openProcessConfigModal}
        />
        <ToastContainer />
        {/* <SelectBotModal
          show={this.state.selectmodalShow}
          onHide={() => this.setState({ selectmodalShow: false })}
          selectbot={this.selectBot}
        /> */}
        <Navbarup />
        <SidebarLeft
          showWarnings={this.showWarnings}
          showBtn={!!Object.keys(this.state.warnings).length}
          runBot={this.runBot}
          openBotSaveModal={this.openBotSaveModal}
          saveIteration={this.saveIteration}
          openGenerateCodeModal={this.openGenerateCodeModal}
          ocr={this.ocr}
        ></SidebarLeft>

        <div>
          <Row>
            <SearchBar />
          </Row>
          <Row
            style={{
              marginTop: "25vh",
              marginLeft: "30vh",
              marginRight: "5vh",
            }}
          >
            <Col xs={12} md={12} lg={6} xl={6}>
              <Flowchart
                removeWarningOnProcessUpdate={this.removeWarningOnProcessUpdate}
                activeWarning={this.state.activeWarning}
                fpg={this.props.fpg}
              />
            </Col>
            <Col xs={12} md={12} lg={6} xl={6}>
              <DatasetLoader />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  const fpg = {};
  for (const id in state.processGroups) {
    state.processGroups[id].processes.forEach((pid, index) => {
      const { processes, ...group } = state.processGroups[id];
      const pg = { ...group, index, id };
      fpg[pid] = fpg[pid] ? [...fpg[pid], pg] : [pg];
    });
  }
  return {
    fpg,
    process: state.process,
    botName: state.botName,
    headers: state.headers,
    status: state.status,
    filepath: state.filepath,
    variables: state.variables,
    botIteration: state.botIteration,
    downloadPath: state.downloadPath,
    uploadPath: state.uploadPath,
    screenshotPath: state.screenshotPath,
    ocrPath: state.ocrPath,
  };
};
const mapDispatch = (dispatch) => {
  return {
    selectBot: (bot) => {
      dispatch(selectBotAction(bot));
    },
    clearProcess: () => {
      dispatch(clearAllAction());
    },
    editProcess: (process, index) => {
      dispatch(editProcessAction(process, index));
    },
  };
};
export default connect(mapState, mapDispatch)(BotBuildPage);
