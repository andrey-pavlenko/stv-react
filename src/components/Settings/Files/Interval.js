import React, { PureComponent } from 'react';

class Interval extends PureComponent {
  render() {
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Автообновление</label>
        </div>
        <div className="field-body">
          <div className="field is-expanded">
            <div className="field has-addons">
              <div className="control is-expanded">
                <input className="input is-fullwidth" type="number" min="0" />
              </div>
              <div className="control">
                <a className="button is-static">минуты</a>
              </div>
            </div>
            <p className="help">Автообновление отключено</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Interval;
