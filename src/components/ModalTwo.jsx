import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalTwo({ contact, toggle, modal, modalTwoHead }) {
  return (
    <div>
      <Modal isOpen={modal} toggle={() => toggle(!modal)}>
        <ModalHeader toggle={() => toggle(!modal)}>{modalTwoHead}</ModalHeader>
        <ModalBody>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{contact.id}</td>
                <td>{contact.phone}</td>
                <td>{contact.country.name}</td>
              </tr>
            </tbody>
          </table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalTwo;
