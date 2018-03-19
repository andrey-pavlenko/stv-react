import React, { PureComponent } from 'react';

class Encoding extends PureComponent {
  render() {
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Кодировка</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <select>
                  <option value="-1" style={{ display: 'none' }}>
                    Выбрать
                  </option>
                  <option value="windows1251">Windows-1251</option>
                  <option value="utf8">UFT-8</option>
                </select>
              </div>
              <p className="help">Значение обязательно</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Encoding;
