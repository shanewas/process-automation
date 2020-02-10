const React = require("react");
const reactBootstrap = require("react-bootstrap");

const { Fragment } = React;
const { Container, Navbar, Button } = reactBootstrap;

class Search extends React.Component {
  render() {
    return (
      <Fragment>
        <Container>
          <Navbar>
            <div class="md-form mt-0">
              <input
                class="form-control"
                type="text"
                placeholder="Enter the WEB APP"
                aria-label="Search"
              />
            </div>
            <Button>Primary</Button>
          </Navbar>
        </Container>
      </Fragment>
    );
  }
}

module.exports = Search;
