import React from 'react';
import ValidationField from '../ValidationField';

class Interval extends ValidationField {
  render() {
    const { data, setData } = this.context;

    // FIXME: Remove disabled after Autorequest implement
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Автообновление</label>
        </div>
        <div className="field-body">
          <div className="field is-expanded">
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  disabled
                  className="input is-fullwidth"
                  type="number"
                  min="0"
                  value={data.get('interval')}
                  onChange={event =>
                    setData('interval', parseInt(event.target.value, 10) || 0)
                  }
                />
              </div>
              <div className="control">
                <a className="button is-static">минуты</a>
              </div>
            </div>
            {this.renderValidation('interval')}
          </div>
        </div>
      </div>
    );
  }
}

export default Interval;
