import React from 'react';
import ValidationField from '../ValidationField';

class Cors extends ValidationField {
  render() {
    const { data, setData } = this.context;
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">CORS прокси</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={data.get('cors')}
                  onChange={event => setData('cors', event.target.value)}
                >
                  <option value="">Не использовать</option>
                  <option value="https://thingproxy.freeboard.io/fetch/">
                    thingproxy.freeboard.io
                  </option>
                  <option value="https://corsproxy.our.buildo.io/">
                    corsproxy.our.buildo.io
                  </option>
                  <option value="http://gobetween.oklabs.org/pipe/">
                    gobetween.oklabs.org
                  </option>
                  <option value="http://cors.hyoo.ru/">cors.hyoo.ru</option>
                  <option value="http://fuck-cors.com/?url=">
                    fuck-cors.com
                  </option>
                  <option value="https://cors.io/?">cors.io</option>
                </select>
              </div>
              {this.renderValidation('cors')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cors;
