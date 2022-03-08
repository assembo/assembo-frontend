import { List, ListItem, ListItemIcon } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useWindowDims } from "../../../utils/useWindowDims";
import { ASSEMBO_COLORS } from "../../../constants/constants";
import { SidebarLinks } from "../SideBar/SideBarLinks";

import MeetingCenterUserProfile from "../../MeetingCenter/MeetingCenterSidePanel/MeetingCenterUserProfile";

const IconDrawer = ({ setOpen }) => {
  // const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowDims();
  const drawerWidth = width * 0.3;
  const user = useSelector( state => state.user.value );
  return (
    <>
      <List
        style={{
          backgroundColor: ASSEMBO_COLORS.dark,
          height: "100vh",
          color: ASSEMBO_COLORS.primary,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {SidebarLinks.map((text, index) => (
          <ListItem
            button
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
            onClick={() => {
              // navigate(text.path);
              setOpen(true);
            }}
          >
            <ListItemIcon
              style={{
                color:
                  location.pathname !== text.path
                    ? ASSEMBO_COLORS.primary
                    : ASSEMBO_COLORS.seconday,
                padding: 0,
                margin: 0,
                minWidth: 0,
                fontSize: 50,
              }}
            >
              {text.icon}
            </ListItemIcon>
          </ListItem>
        ))}
        <ListItem
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            marginTop: "auto",
            marginBottom: 30,
          }}
        >
          <MeetingCenterUserProfile 
            styleOverride={{}}
            user={user}>
          </MeetingCenterUserProfile>
        </ListItem>
      </List>
    </>
  );
};
export default IconDrawer;
