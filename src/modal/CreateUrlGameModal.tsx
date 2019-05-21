import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export interface ICreateUrlGameModalProps {
  is_open: boolean;
  toggle: any;

  game_id: string | null;
}

export interface ICreateUrlGameModalState {}

export default class CreateUrlGameModal extends Component<
  ICreateUrlGameModalProps,
  ICreateUrlGameModalState
> {
  constructor(props: any) {
    super(props);
  }

  toggle() {
    this.props.toggle(!this.props.is_open);
  }

  toggleIsOpen(open: boolean) {
    this.props.toggle(open);
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.is_open} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle.bind(this)}>Create Game</ModalHeader>
          <ModalBody>
            <span>http://localhost:3000/game/join/{this.props.game_id}</span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle.bind(this)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
