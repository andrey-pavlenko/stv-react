import React from 'react';
import ValidationField from '../ValidationField';

class Url extends ValidationField {
  render() {
    const { data, setData } = this.context;
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
                value={data.get('url')}
                onChange={event => setData('url', event.target.value)}
              />
            </div>
            {this.renderValidation('url')}
          </div>
        </div>
      </div>
    );
  }
}

export default Url;
