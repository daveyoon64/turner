import React, {useState, useEffect} from 'react';

const getCurrentPath = () => {
  const path = document.location.pathname;
  return path.substring(path.lastIndexOf('/'));
}

export const RouterContext = React.createContext();

export function Router(props) {
  const [route, setRoute] = useState(getCurrentPath());

  useEffect(() => {
    window.onpopstate = () => {
      setRoute(getCurrentPath());
    };
  });

  function handleLinkClick(route) {
    this.setRoute(route);
    window.history.pushState(null, '', route);
  }

  return (<div>
    <RouterContext.Provider value={{route: route, linkHandler: handleLinkClick}}>
      {props.children}
    </RouterContext.Provider>
  </div> );
}