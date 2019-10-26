import React, { useEffect } from 'react';
import { Button, Col, Alert, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { AvForm, AvField } from 'availity-reactstrap-validation';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';

export interface IUserSettingsProps extends StateProps, DispatchProps {}

export const SettingsPage = (props: IUserSettingsProps) => {
  useEffect(() => {
    props.getSession();
    return () => {
      props.reset();
    };
  }, []);

  const handleValidSubmit = (event, values) => {
    const account = {
      ...props.account,
      ...values
    };

    props.saveAccountSettings(account);
    event.persist();
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">הגדרות עבור {props.account.login}</h2>
          <AvForm id="settings-form" onValidSubmit={handleValidSubmit}>
            {/* First name */}
            <AvField
              className="form-control"
              name="firstName"
              label="שם פרטי"
              id="firstName"
              placeholder="שם פרטי"
              validate={{
                required: { value: true, errorMessage: 'שם פרטי הינו שדה חובה' },
                minLength: { value: 1, errorMessage: 'השם הפרטי חייב להכיל לפחות תו אחד' },
                maxLength: { value: 50, errorMessage: 'השם הפרטי לא יכול להיות ארוך יותר מ 50 תווים' }
              }}
              value={props.account.firstName}
            />
            {/* Last name */}
            <AvField
              className="form-control"
              name="lastName"
              label="שם משפחה"
              id="lastName"
              placeholder="שם משפחה"
              validate={{
                required: { value: true, errorMessage: 'שם משפחה הינו שדה חובה' },
                minLength: { value: 1, errorMessage: 'שם המשפחה חייב להכיל לפחות תו 1' },
                maxLength: { value: 50, errorMessage: 'שם המשפחה לא יכול להיות ארוך יותר מ 50 תווים' }
              }}
              value={props.account.lastName}
            />
            {/* Email */}
            <AvField
              name="email"
              label="מייל"
              placeholder={'מייל'}
              type="email"
              validate={{
                required: { value: true, errorMessage: 'מייל הינו שדה חובה' },
                minLength: { value: 5, errorMessage: 'המייל חייב להיות באורך של לפחות 5 תווים' },
                maxLength: { value: 254, errorMessage: 'מייל לא יכול להיות ארוך יותר מ 50 תווים' }
              }}
              value={props.account.email}
            />
            <Button color="primary" type="submit">
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

const mapDispatchToProps = { getSession, saveAccountSettings, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
