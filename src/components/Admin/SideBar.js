import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { FaTachometerAlt, FaGem } from "react-icons/fa";
import { DiReact } from "react-icons/di";
import sidebarBg from "../../assets/bg2.jpg";
import { Link } from "react-router-dom";

const SideBar = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <DiReact size={"3em"} color={"00bfff"} />
            WEB TEST
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaTachometerAlt />}>
              <Link to={"/admins"}>Dashboard</Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title={"Features"}>
              <MenuItem>
                <Link to={"/admins/manage-users"}>Users</Link>
              </MenuItem>
              <MenuItem> Quizz </MenuItem>
              <MenuItem> Questions </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </>
  );
};

export default SideBar;
