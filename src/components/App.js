import React from "react";
import { HashRouter, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useUserState } from "../context/UserContext";
import SetPassword from "../pages/login/SetPassword";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <BrowserRouter>
      <Switch>
      {/* <Route  path="/registration/:type" Component={App}/> */}

        <Route exact path="/application_informantion" render={() => <Redirect to="/app/application_informantion" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/application_informantion" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <Route path="/" exact render={() => <Redirect to="/evrb" />} />
        <PublicRoute path="/evrb" component={Login} />
        <PublicRoute path="/set-password" component={SetPassword} />
        {/* <Route path="/" component={Landing} /> */}
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/application_informantion",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}






// import React from "react";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// // components
// import Layout from "./Layout";

// // pages
// import Error from "../pages/error";
// import Login from "../pages/login";
// import Landing from "../landing";

// // context
// import { useUserState } from "../context/UserContext";

// export default function App() {
//   // global
//   var { isAuthenticated } = useUserState();

//   // Function to extract registration type from URL and store it in session
//   const storeRegistrationTypeInSession = () => {
//     const url = window.location.href;
//     const loginIndex = url.indexOf("/login");
//     if (loginIndex !== -1) {
//       const registrationType = url.substring(loginIndex + 6); // Extract the part after "/login"
//       sessionStorage.setItem("registration_type", registrationType);
//     }
//   };

//   // Call the function when the component mounts
//   React.useEffect(() => {
//     storeRegistrationTypeInSession();
//   }, []);

//   return (
//     <BrowserRouter>
//       <Switch>
//         {/* Routes */}
//         <Route exact path="/dashboard" render={() => <Redirect to="/app/dashboard" />} />
//         <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
//         <PrivateRoute path="/app" component={Layout} />
//         <PublicRoute path="/login" component={Login} />
//         <PublicRoute path="/error" component={Error} />
//         <Route path="/" component={Landing} />
      
//       </Switch>
//     </BrowserRouter>
//   );

//   // #######################################################################

//   function PrivateRoute({ component, ...rest }) {
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           isAuthenticated ? (
//             React.createElement(component, props)
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/",
//                 state: {
//                   from: props.location,
//                 },
//               }}
//             />
//           )
//         }
//       />
//     );
//   }

//   function PublicRoute({ component, ...rest }) {
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           isAuthenticated ? (
//             <Redirect
//               to={{
//                 pathname: "/dashboard",
//               }}
//             />
//           ) : (
//             React.createElement(component, props)
//           )
//         }
//       />
//     );
//   }
// }





// import React from "react";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// // components
// import Layout from "./Layout";

// // pages
// import Error from "../pages/error";
// import Login from "../pages/login";
// import Landing from "../landing";

// // context
// import { useUserState } from "../context/UserContext";

// export default function App() {
//   // global
//   var { isAuthenticated } = useUserState();

//   // Function to extract registration type from URL and store it in session
//   const storeRegistrationTypeInSession = () => {
//     const url = window.location.href;
//     const loginIndex = url.indexOf("/login");
//     if (loginIndex !== -1) {
//       const registrationType = url.substring(loginIndex + 6); // Extract the part after "/login"
//       if (isValidRegistrationType(registrationType)) {
//         sessionStorage.setItem("registration_type", registrationType);
//       } else {
//         window.location.href = "/error"; // Redirect to error page if the registration type is invalid
//       }
//     }
//   };

//   // Call the function when the component mounts
//   React.useEffect(() => {
//     storeRegistrationTypeInSession();
//   }, []);

//   // Function to check if the registration type is valid
//   const isValidRegistrationType = (type) => {
//     // Define valid registration type patterns
//     // const validPatterns = [
//     //   /^\/vrb\/registration\/full$/,
//     //   /^\/vrb\/registration\/temporary$/,
//     //   /^\/login\/vrb\/registration\/provision$/,
//     //   /^\/login\/vrb\/registration\/enlistment$/,
//     //   /^\/login\/vrb\/registration\/firm$/,
//     // ];

//     const validPatterns = [
//       /^\/vrb\/registration\/full$/,
//       /^\/vrb\/registration\/temporary$/,
//       /^\/vrb\/registration\/provision$/,
//       /^\/vrb\/registration\/enlistment$/,
//       /^\/vrb\/registration\/firm$/,
//     ];
//     // Check if the type matches any valid pattern
//     return validPatterns.some((pattern) => pattern.test(type));
//   };

//   return (
//     <BrowserRouter>
//       <Switch>
//         {/* Routes */}
//         <Route exact path="/dashboard" render={() => <Redirect to="/app/dashboard" />} />
//         <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
//         <PrivateRoute path="/app" component={Layout} />
//         <PublicRoute path="/login" component={Login} />
//         <Route path="/error" component={Error} />
//         <Route path="/" component={Landing} />
//       </Switch>
//     </BrowserRouter>
//   );

//   // #######################################################################

//   function PrivateRoute({ component, ...rest }) {
//     return (
//       <Route
//         {...rest}
//         render={(props) =>
//           isAuthenticated ? (
//             React.createElement(component, props)
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/",
//                 state: {
//                   from: props.location,
//                 },
//               }}
//             />
//           )
//         }
//       />
//     );
//   }

//   function PublicRoute({ component, ...rest }) {
//     return (
//       <Route
//         {...rest}
//         render={(props) =>
//           isAuthenticated ? (
//             <Redirect
//               to={{
//                 pathname: "/dashboard",
//               }}
//             />
//           ) : (
//             React.createElement(component, props)
//           )
//         }
//       />
//     );
//   }
// }
