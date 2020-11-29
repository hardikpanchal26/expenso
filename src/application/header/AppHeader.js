import "./AppHeader.css";
import { Container, Header, Button } from "semantic-ui-react";
import Cookies from "universal-cookie";

const AppHeader = ({ auth, setAuth, route, setRoute }) => (
  <header className="App-header">
    <div className="header-container">
      <Container className="header">
        <Header className="App-title" size="large">
          Expenso
        </Header>
        <div>
          {auth ? (
            <>
              <Button
                inverted
                onClick={() => {
                  const cookies = new Cookies();
                  cookies.remove('auth');
                  setAuth(null);
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                inverted
                className="mr-8"
                onClick={() => setRoute("login")}
              >
                Log in
              </Button>
              <Button inverted onClick={() => setRoute("register")}>
                Register
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  </header>
);

export default AppHeader;
