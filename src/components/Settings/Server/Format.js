import React from 'react';
import Field from '../Field';

class Format extends Field {
  render() {
    const { data, setData } = this.context;

    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Формат расписаний</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={data.get('format')}
                  onChange={event => setData('format', event.target.value)}
                >
                  <option value="0">Text</option>
                  <option value="1">XML TV</option>
                  <option value="2">XML</option>
                  <option value="4">XLS</option>
                  <option value="9">HTML</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Format;
