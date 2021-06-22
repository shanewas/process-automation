import React from "react";
import {
  CloudUpload as UploadIcon,
  CloudDownload as DownloadIcon,
  LinkRounded as LinkIcon,
  MouseRounded as MouseIcon,
  FolderRounded as LoadIcon,
  KeyboardHideRounded as KeyBoardIcon,
  CameraAltRounded as CameraIcon,
  FlipToFront as ExtractIcon,
} from "@material-ui/icons";
import Icon from "react-hero-icon";

export default {
  link: {
    Icon: <Icon icon="external-link" />,
    color: "#6AD9C4",
    bgcolor: "rgba(106, 217, 196, 0.10)",
  },
  click: {
    Icon: <Icon icon="cursor-click" />,
    color: "#F9DB6D",
    bgcolor: "rgba(249, 219, 109, 0.10)",
  },
  LoadData: {
    Icon: <Icon icon="document-download" />,
    color: "#FEA042",
    bgcolor: "rgba(254, 160, 66, 0.10)",
  },
  KeyBoard: {
    Icon: <KeyBoardIcon />,
    color: "#FE426F",
    bgcolor: "rgba(254, 66, 111, 0.10)",
  },
  ScreenShot: {
    Icon: <Icon icon="camera" />,
    color: "#FE42C9",
    bgcolor: "rgba(254, 66, 201, 0.10)",
  },
  "Extract Data": {
    Icon: <ExtractIcon />,
    color: "#78DAf3",
    bgcolor: "rgba(120, 218, 243, 0.10)",
  },
  download: {
    Icon: <Icon icon="download" />,
    color: "#9CCD62",
    bgcolor: "rgba(106, 205, 98, 0.10)",
  },
  upload: {
    Icon: <UploadIcon name="upload" />,
    color: "#01F9C5",
    bgcolor: "rgba(1, 249, 197, 0.10)",
  },
};
