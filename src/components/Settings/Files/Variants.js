import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Variants extends Component {
  static contextTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    variants: PropTypes.object
  };

  handleToggleVariant = (event, variant) => {
    const { data, setData } = this.context;
    if (event.target.checked) {
      setData('hiddenVariants', [...data.get('hiddenVariants'), variant]);
    } else {
      setData(
        'hiddenVariants',
        data.get('hiddenVariants').filter(v => v !== variant)
      );
    }
  };

  render() {
    const { data, variants } = this.context;

    if (variants.size === 0) {
      return null;
    }

    // TODO: style width, margin-bottom
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">Варианты</p>
        </header>
        <div className="card-content">
          <table
            className="table is-hoverable is-fullwidth"
            style={{ marginBottom: 0 }}
          >
            <thead>
              <tr>
                <th>Скрыть</th>
                <th style={{ width: '100%' }}>Вариант</th>
              </tr>
            </thead>
            <tbody>
              {variants.map(variant => (
                <tr key={variant}>
                  <td className="has-text-centered">
                    <input
                      type="checkbox"
                      checked={data.get('hiddenVariants').includes(variant)}
                      onChange={event =>
                        this.handleToggleVariant(event, variant)
                      }
                    />
                  </td>
                  <td>{variant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Variants;
