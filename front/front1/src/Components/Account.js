import React from "react";
import { Modal, Button } from "react-bootstrap";
class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
  handleModal() {
    this.setState({ show: !this.state.show });
  }
  render() {
    return (
      <div>
        <Button
          onClick={() => {
            this.handleModal();
          }}
        >
          Open Modal
        </Button>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          show={this.state.show}
        >
          <Modal.Header>Modal Head Part</Modal.Header>
          <Modal.Body>Hi , Reacgt modal is here</Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.handleModal();
              }}
            >
              Close Modal
            </Button>
          </Modal.Footer>
        </Modal>

        {/* <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal> */}
      </div>
    );
  }
}
export default Account;
