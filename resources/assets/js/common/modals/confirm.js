import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

const translationNamespaces = [
  "global",
];

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  open(){
    this.setState({ open: true });
  }

  close(confirmed = null){
    this.setState({ open: false });

    if (confirmed !== null){
      if (confirmed)
        this.props.onConfirm();
      else if (this.props.onCancel)
        this.props.onCancel();
    }
  }

  toggle() {
    if (this.state.open)
      this.close();
    else this.open();
  }

  render() {
    const { t, body, title } = this.props;

    return (
      <Modal isOpen={this.state.open}>
        <ModalHeader className="bg-warning">{title || t("global:confirm_title")}</ModalHeader>
        <ModalBody className="text-center">{body}</ModalBody>
        <ModalFooter className="justify-content-center">
          <Button color="success" onClick={() => this.close(true)}>{ t("global:confirm") }</Button>{' '}
          <Button color="danger" onClick={() => this.close(false)}>{ t("global:cancel") }</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ConfirmModal.propTypes = {
  title: PropTypes.string,
  body: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string,
  ]).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default translate(translationNamespaces, { withRef: true })(ConfirmModal);
