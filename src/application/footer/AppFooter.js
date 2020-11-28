import "./AppFooter.css";
import { Container, Header, Icon } from "semantic-ui-react";

const AppFooter = ({ auth, setRoute }) => {
  return (
    <div className="App-footer">
      {!auth && (
        <Container>
          <div className="footer">
            <Header>Developed by Hardik Panchal</Header>
          </div>
        </Container>
      )}
      {auth && (
        <Container>
          <div className="footer">
            <div className="link-container">
              <Icon name="home" size="big" onClick={() => setRoute("home")} />
              <div>Home</div>
            </div>
            <div className="link-container" onClick={() => setRoute("add")}>
              <Icon name="plus circle" size="big" />
              <div>Add New</div>
            </div>
            <div className="link-container">
              <Icon
                name="chart bar"
                size="big"
                onClick={() => setRoute("stats")}
              />
              <div>Stats</div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default AppFooter;
