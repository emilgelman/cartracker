import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  render() {
    const { loginError, handleClose } = this.props;

    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="login-page" autoFocus={false}>
        <AvForm onSubmit={this.handleSubmit}>
          <ModalHeader id="login-title" toggle={handleClose}>
            התחבר
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                {loginError ? (
                  <Alert color="danger">
                    <strong>שגיאה!</strong> בדוק את הפרטים ונסה שנית
                  </Alert>
                ) : null}
              </Col>
              <Col md="12">
                <AvField
                  name="username"
                  label="שם משתמש"
                  placeholder="שם משתמש"
                  required
                  errorMessage="שם משתמש לא יכול להיות ריק!"
                  autoFocus
                />
                <AvField
                  name="password"
                  type="password"
                  label="סיסמה"
                  placeholder="סיסמא"
                  required
                  errorMessage="סיסמה לא יכולה להיות ריקה!"
                />
                <AvGroup check inline>
                  <Label className="form-check-label">
                    <AvInput type="checkbox" name="rememberMe" /> זכור אותי
                  </Label>
                </AvGroup>
              </Col>
            </Row>
            <div className="mt-1">&nbsp;</div>
            <Alert color="warning">
              <Link to="/account/reset/request">שחזור סיסמה</Link>
            </Alert>
            <Alert color="warning">
              <span>אין לך חשבון עדיין?</span> <Link to="/account/register">צור חשבון</Link>
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              התחבר
            </Button>
            <Button color="secondary" onClick={handleClose} tabIndex="1">
              ביטול
            </Button>{' '}
          </ModalFooter>
        </AvForm>
      </Modal>
    );
  }
}

export default LoginModal;
