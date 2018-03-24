import React from 'react';
import Field from '../Field';

class Timezone extends Field {
  render() {
    const { data, setData } = this.context;

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
                value={data.get('timezone')}
                onChange={event =>
                  setData('timezone', parseInt(event.target.value, 10) || 0)
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Timezone;
