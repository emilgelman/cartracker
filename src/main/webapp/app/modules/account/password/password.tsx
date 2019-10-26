import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { savePassword, reset } from './password.reducer';

export interface IUserPasswordProps extends StateProps, DispatchProps {}

export const PasswordPage = (props: IUserPasswordProps) => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    props.reset();
    props.getSession();
    return () => props.reset();
  }, []);

  const handleValidSubmit = (event, values) => {
    props.savePassword(values.currentPassword, values.newPassword);
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="password-title">שינוי סיסמה עבור {props.account.login}</h2>
          <AvForm id="password-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="currentPassword"
              label="סיסמה נוכחית"
              placeholder={'סיסמה נוכחית'}
              type="password"
              validate={{
                required: { value: true, errorMessage: 'סיסמה נוכחית הינו שדה חובה' }
              }}
            />
            <AvField
              name="newPassword"
              label="סיסמה חדשה"
              placeholder={'סיסמה חדשה'}
              type="password"
              validate={{
                required: { value: true, errorMessage: 'סיסמה החדשה הינו שדה חובה' },
                minLength: { value: 4, errorMessage: 'הסיסמה החדשה חייבת להיות באורך של לפחות 4 תווים' },
                maxLength: { value: 50, errorMessage: 'הסיסמה החדשה לא יכולה להיות ארוכה יותר מ 50 תווים' }
              }}
              onChange={updatePassword}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="confirmPassword"
              label="אמת סיסמה חדשה"
              placeholder="אמת סיסמה חדשה"
              type="password"
              validate={{
                required: {
                  value: true,
                  errorMessage: 'אימות סיסמה חדשה הינו שדה חובה'
                },
                minLength: {
                  value: 4,
                  errorMessage: 'הסיסמה החדשה חייבת להיות באורך של לפחות 4 תווים'
                },
                maxLength: {
                  value: 50,
                  errorMessage: 'הסיסמה החדשה לא יכולה להיות ארוכה יותר מ 50 תווים'
                },
                match: {
                  value: 'newPassword',
                  errorMessage: 'שדה הסיסמה ואימות הסיסמה אינם זהים'
                }
              }}
            />
            <Button color="success" type="submit">
              שמור
            </Button>
          </AvForm>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, savePassword, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordPage);
