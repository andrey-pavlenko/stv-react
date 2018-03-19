import React, { PureComponent } from 'react';

class Variants extends PureComponent {
  render() {
    const variants = [
      'Анонсы',
      'Расписания',
      'Правки',
      'Фотографии',
      'Дополнения'
    ];

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
                    <input type="checkbox" />
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
