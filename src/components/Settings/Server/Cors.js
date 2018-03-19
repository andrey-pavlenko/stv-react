import React, { PureComponent } from 'react';

class Cors extends PureComponent {
  render() {
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">CORS прокси</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <select>
                  <option value="">Не использовать</option>
                  <option value="https://cors.io/?">cors.io</option>
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
                </select>
              </div>
              <p className="help">Не будет работать</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cors;
