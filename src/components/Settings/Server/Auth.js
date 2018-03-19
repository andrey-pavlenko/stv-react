import React, { PureComponent, Fragment } from 'react';

class Auth extends PureComponent {
  state = {
    isTestLogin: false
  };

  render() {
    return (
      <Fragment>
        <div className="field is-horizontal">
          <div className="field-label is-normal" />
          <div className="field-body">
            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input type="checkbox" />&nbsp;Тестовый вход
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Логин</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input type="text" className="input is-fullwidth" />
              </div>
              <p className="help">Значение обязательно</p>
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
                <input type="text" className="input is-fullwidth" />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Auth;
