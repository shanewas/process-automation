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

export default {
  link: {
    Icon: <LinkIcon />,
    color: "#6AD9C4",
    bgcolor: "rgba(106, 217, 196, 0.15)",
  },
  click: {
    Icon: <MouseIcon />,
    color: "#F9DB6D",
    bgcolor: "rgba(249, 219, 109, 0.15)",
  },
  LoadData: {
    Icon: <LoadIcon />,
    color: "#FEA042",
    bgcolor: "rgba(254, 160, 66, 0.15)",
  },
  KeyBoard: {
    Icon: <KeyBoardIcon />,
    color: "#FE426F",
    bgcolor: "rgba(254, 66, 111, 0.15)",
  },
  ScreenShot: {
    Icon: <CameraIcon />,
    color: "#FE42C9",
    bgcolor: "rgba(254, 66, 201, 0.15)",
  },
  "Extract Data": {
    Icon: <ExtractIcon />,
    color: "#78DAf3",
    bgcolor: "rgba(120, 218, 243, 0.15)",
  },
  download: {
    Icon: <DownloadIcon />,
    color: "#9CCD62",
    bgcolor: "rgba(156, 205, 98, 0.15)",
  },
  upload: {
    Icon: <UploadIcon />,
    color: "#01F9C5",
    bgcolor: "rgba(1, 249, 197, 0.15)",
  },
};
