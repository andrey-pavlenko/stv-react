import React, { PureComponent } from 'react';

class Url extends PureComponent {
  render() {
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Адрес</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                className="input is-fullwidth"
                type="text"
                placeholder="Адрес сервера телепрограмм"
              />
            </div>
            <p className="help">Значение обязательно</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Url;
