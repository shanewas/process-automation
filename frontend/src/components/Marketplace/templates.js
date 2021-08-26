import {
  VerifiedUser as VerifyIcon,
  SupervisedUserCircle as UserIcon,
  AccountBalance as LoanIcon,
} from "@material-ui/icons";

export default [
  {
    id: "1",
    title: "Account Verification using facial recognition",
    createdBy: "AIW",
    createdById: "",
    usedBy: "1.5k",
    color: "#74E3CE",
    backgroundColor: "rgba(116, 227, 206, 0.3)",
    Icon: VerifyIcon,
  },
  {
    id: "2",
    title: "Automated account registration for new employees",
    createdBy: "AIW",
    createdById: "",
    usedBy: "33.5k",
    color: "#FEA042",
    backgroundColor: "rgba(254, 160, 66, 0.3)",
    Icon: UserIcon,
  },
  {
    id: "3",
    title: "Bank approval verification",
    createdBy: "AIW",
    createdById: "",
    usedBy: "15k",
    color: "#FE42C9",
    backgroundColor: "rgba(254, 66, 201, 0.3)",
    Icon: LoanIcon,
  },
];
