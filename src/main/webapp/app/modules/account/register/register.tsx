import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';

export type IRegisterProps = DispatchProps;

export const RegisterPage = (props: IRegisterProps) => {
  const [password, setPassword] = useState('');

  useEffect(() => () => props.reset(), []);

  const handleValidSubmit = (event, values) => {
    props.handleRegister(values.username, values.email, values.firstPassword);
    event.preventDefault();
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title">הרשמה</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <AvForm id="register-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="username"
              label="שם משתמש"
              placeholder={'שם משתמש'}
              validate={{
                required: { value: true, errorMessage: 'שם משתמש הינו שדה חובה' },
                pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: 'שם המשתמש יכול להכיל רק אותיות באנגלית וספרות' },
                minLength: { value: 1, errorMessage: 'שם המשתמש חייב להכיל לפחות תו אחד' },
                maxLength: { value: 50, errorMessage: 'שם המשתמש לא יכול להיות ארוך יותר מ 50 תווים' }
              }}
            />
            <AvField
              name="email"
              label="מייל"
              placeholder={'מייל'}
              type="email"
              validate={{
                required: { value: true, errorMessage: 'מייל הינו שדה חובה' },
                minLength: { value: 5, errorMessage: 'מייל חייב להיות באורך של לפחות 5 תווים' },
                maxLength: { value: 254, errorMessage: 'מייל לא יכול להיות ארוך יותר מ 50 תווים' }
              }}
            />
            <AvField
              name="firstPassword"
              label="סיסמה"
              placeholder={'סיסמה'}
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, errorMessage: 'סיסמה הינו שדה חובה' },
                minLength: { value: 4, errorMessage: 'הסיסמה חייבת להיות באורך של לפחות 4 תווים' },
                maxLength: { value: 50, errorMessage: 'הסיסמה אינה יכולה להיות באורך של יותר מ 50 תווים' }
              }}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="secondPassword"
              label="אימות סיסמה"
              placeholder="אימות סיסמה"
              type="password"
              validate={{
                required: { value: true, errorMessage: 'אימות סיסמה הינו שדה חובה' },
                minLength: { value: 4, errorMessage: 'הסיסמה חייבת להיות באורך של לפחות 4 תווים' },
                maxLength: { value: 50, errorMessage: 'הסיסמה אינה יכולה להיות באורך של יותר מ 50 תווים' },
                match: { value: 'firstPassword', errorMessage: 'שדה הסיסמה ואימות הסיסמא אינם זהים' }
              }}
            />
            <Button id="register-submit" color="primary" type="submit">
              הרשם
            </Button>
          </AvForm>
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = { handleRegister, reset };
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  null,
  mapDispatchToProps
)(RegisterPage);
