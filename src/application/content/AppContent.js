import "./AppContent.css";
import PreLogin from "./pre-login/PreLogin";
import PostLogin from "./post-login/PostLogin";

const AppContent = ({ auth, setAuth, user, setUser, route, setRoute }) => {
  return (
    <div className="App-content">
      {!auth && (
        <PreLogin
          key={route}
          auth={auth}
          setAuth={setAuth}
          user={user}
          setUser={setUser}
          route={route}
        />
      )}
      {auth && <PostLogin route={route} auth={auth} />}
    </div>
  );
};

export default AppContent;
