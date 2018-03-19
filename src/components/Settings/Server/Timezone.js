import React, { PureComponent } from 'react';

class Timezone extends PureComponent {
  render() {
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Временная зона</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                className="input is-fullwidth"
                type="number"
                min="-12"
                max="12"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Timezone;
