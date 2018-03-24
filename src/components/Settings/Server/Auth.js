import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ValidationField from '../ValidationField';

class Auth extends ValidationField {
  static contextTypes = {
    ...ValidationField.contextTypes,
    setDataCallback: PropTypes.func
  };

  handleTestLogin = event => {
    const checked = event.target.checked;
    this.context.setDataCallback((prevData, settings) =>
      prevData
        .set(
          'login',
          checked
            ? 'test'
            : settings.get('login') === 'test' ? '' : settings.get('login')
        )
        .set('password', checked ? '' : settings.get('password'))
    );
  };

  render() {
    const { data, setData } = this.context;
    const isTestLogin = data.get('login') === 'test';

    return (
      <Fragment>
        <div className="field is-horizontal">
          <div className="field-label is-normal" />
          <div className="field-body">
            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={isTestLogin}
                    onChange={this.handleTestLogin}
                  />&nbsp;Тестовый вход
                </label>
              </div>
            </div>
          </div>
        </div>
        {!isTestLogin && (
          <Fragment>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Логин</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      type="text"
                      className="input is-fullwidth"
                      value={data.get('login')}
                      onChange={event => setData('login', event.target.value)}
                    />
                  </div>
                  {this.renderValidation('login')}
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Пароль</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      type="text"
                      className="input is-fullwidth"
                      value={data.get('password')}
                      onChange={event =>
                        setData('password', event.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Auth;
