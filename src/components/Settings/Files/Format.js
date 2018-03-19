import React, { PureComponent } from 'react';

class Format extends PureComponent {
  render() {
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Формат расписаний</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <select>
                  <option value="-1" style={{ display: 'none' }}>
                    Выбрать
                  </option>
                  <option value="0">Text</option>
                  <option value="1">XML TV</option>
                  <option value="2">XML</option>
                  <option value="4">XLS</option>
                  <option value="9">HTML</option>
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

export default Format;
