// import React, { useState, useEffect } from "react";
// import { Drawer, IconButton, List } from "@material-ui/core";
// import {
//   Home as HomeIcon,
//   NotificationsNone as NotificationsIcon,
//   FormatSize as TypographyIcon,
//   FilterNone as UIElementsIcon,
//   BorderAll as TableIcon,
//   QuestionAnswer as SupportIcon,
//   LibraryBooks as LibraryIcon,
//   HelpOutline as FAQIcon,
//   ArrowBack as ArrowBackIcon,
//   CheckCircleOutlineRounded as CheckCircleOutlineRoundedIcon,
//   CancelOutlined as CancelOutlinedIcon
// } from "@material-ui/icons";
// import { useTheme } from "@material-ui/styles";
// import { withRouter } from "react-router-dom";
// import classNames from "classnames";
// import log from '../../images/logo.png'
// import AuthService from "../../services/auth/auth_service";

// // styles
// import useStyles from "./styles";

// // components
// import SidebarLink from "./components/SidebarLink/SidebarLink";
// import Dot from "./components/Dot";

// // context
// import {
//   useLayoutState,
//   useLayoutDispatch,
//   toggleSidebar,
// } from "../../context/LayoutContext";

// const structure = [
//   { id: 0, label: "Application Info", link: "/app/dashboard", icon: <CheckCircleOutlineRoundedIcon style={{color: 'green'}} /> },
//   {
//     id: 1,
//     label: "Education Background",
//     link: "/app/typography",
//     icon: <CheckCircleOutlineRoundedIcon style={{color: 'green'}} />,
//   },
//   { id: 2, label: "Membership in Professional", link: "/app/membership", icon:  <CheckCircleOutlineRoundedIcon style={{color: 'green'}} /> },
  
//   {
//     id: 3,
//     label: "Practical experience",
//     link: "/app/practical",
//     icon:  <CancelOutlinedIcon style={{color: 'red'}} />,
//   },
//   {
//     id: 4,
//     label: "Referees",
//     link: "/app/referees",
//     icon:  <CancelOutlinedIcon style={{color: 'red'}} />,
//   },

//   {
//     id: 5,
//     label: "Payments",
//     link: "/app/payments",
//     icon:  <CancelOutlinedIcon style={{color: 'red'}} />,
//   },


// function Sidebar({ location }) {
//   var classes = useStyles();
//   var theme = useTheme();

//   // global
//   var { isSidebarOpened } = useLayoutState();
//   var layoutDispatch = useLayoutDispatch();

//   // local
//   var [isPermanent, setPermanent] = useState(true);

//   useEffect(function() {
//     window.addEventListener("resize", handleWindowWidthChange);
//     handleWindowWidthChange();
//     return function cleanup() {
//       window.removeEventListener("resize", handleWindowWidthChange);
//     };
//   });


//    const[structure,setStructure]=useState([])

//    useEffect(() => {
//     AuthService.getUserReadModule().then(res => {
//       const fetchedData = res.data.results[0].subMenu;
//       console.log('Modules Available', fetchedData);
      

//       const mappedStructure = fetchedData.map(item => ({
//         id: item.id,
//         label: item.label,
//         link: `/app/${item.link}`,
//         icon: item.valid ? <CheckCircleOutlineRoundedIcon style={{ color: 'green' }} /> : <CancelOutlinedIcon style={{ color: 'red' }} />
//       }));

//       setStructure(mappedStructure);
//     }).catch(error => {
//       console.error("Error fetching data", error);
//     });
//   }, []);

//   return (
//     <Drawer
//       variant={isPermanent ? "permanent" : "temporary"}
//       className={classNames(classes.drawer, {
//         [classes.drawerOpen]: isSidebarOpened,
//         [classes.drawerClose]: !isSidebarOpened,
//       })}
//       classes={{
//         paper: classNames({
//           [classes.drawerOpen]: isSidebarOpened,
//           [classes.drawerClose]: !isSidebarOpened,
//         }),
//       }}
//       open={isSidebarOpened}
//     >
      
//       <div className={classes.toolbar} />
//       <center><img src={log} alt="logo" width={'50%'}/></center>
//       {/* <center><span style={{display: isSidebarOpened?'inherit':'hidden'}}>Fareness and Intergrity</span></center> */}
//       <hr/>
//       <div className={classes.mobileBackButton}>
//         <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
//           <ArrowBackIcon
//             classes={{
//               root: classNames(classes.headerIcon, classes.headerIconCollapse),
//             }}
//           />
//         </IconButton>
//       </div>
//       <List className={classes.sidebarList}>
//         {structure.map(link => (
//           <SidebarLink
//             key={link.id}
//             location={location}
//             root_id={link.id}
//             isSidebarOpened={isSidebarOpened}
//             {...link}
//           />
//         ))}
//       </List>
//     </Drawer>
//   );

//   // ##################################################################
//   function handleWindowWidthChange() {
//     var windowWidth = window.innerWidth;
//     var breakpointWidth = theme.breakpoints.values.md;
//     var isSmallScreen = windowWidth < breakpointWidth;

//     if (isSmallScreen && isPermanent) {
//       setPermanent(false);
//     } else if (!isSmallScreen && !isPermanent) {
//       setPermanent(true);
//     }
//   }
// }

// export default withRouter(Sidebar);








import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircleOutlineRounded as CheckCircleOutlineRoundedIcon,
  CancelOutlined as CancelOutlinedIcon,
  GetApp as DownloadIcon // New icon for "Download PDF"
  } from "@material-ui/icons";
  import QrCodeIcon from '@mui/icons-material/QrCode';
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import log from '../../images/logo.png'
import AuthService from "../../services/auth/auth_service";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";


function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  const[structure,setStructure]=useState([])

  useEffect(() => {
    AuthService.getUserReadModule().then(res => {
      const fetchedData = res.data.results[0].subMenu;
      console.log('Modules Available', fetchedData);
      

      const mappedStructure = fetchedData.map(item => ({
        id: item.id,
        label: item.label,
        link: `/app/${item.link}`,
        icon: item.valid ? <CheckCircleOutlineRoundedIcon style={{ color: 'green' }} /> : <CancelOutlinedIcon style={{ color: 'red' }} />
      }));

      // Adding the "Download PDF" item dynamically at the end
      mappedStructure.push({
        id: mappedStructure.length,
        label: "Download PDF",
        link: "/app/download-pdf",
        icon: < DownloadIcon style={{ color: 'blue' }} />
      });

      mappedStructure.push({
        id: mappedStructure.length,
        label: "Digital Seal",
        link: "/app/digital-seal",
        icon: <QrCodeIcon style={{ color: 'blue' }} />
      });

      setStructure(mappedStructure);
    }).catch(error => {
      console.error("Error fetching data", error);
    });
  }, []);

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      
      <div className={classes.toolbar} />
      <center><img src={log} alt="logo" width={'50%'}/></center>
      <hr/>
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            root_id={link.id}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
