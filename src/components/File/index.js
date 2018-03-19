import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';
import TextContent from './TextContent';
import { getFileItem as stateGetFileItem } from '../../store/selectors';
import { week as formatWeek, time as formatTime } from '../../modules/format';

class File extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getFileItem() {
    const urlId = parseInt(this.props.match.params.urlId, 10);
    if (isNaN(urlId)) {
      return null;
    }

    return stateGetFileItem(urlId);
  }

  render() {
    const item = this.getFileItem();
    if (!item) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <Navbar />
        <div className="container">
          <ul className="file-info">
            <li className="file-info__item">{formatWeek(item.week)}</li>
            <li className="file-info__item">
              <span>{item.variant}</span>
              {item.type && <small className="tag">{item.type}</small>}
            </li>
            {item.timeshift !== 0 && (
              <li className="file-info__item">
                <span className="has-text-grey-light">Пояс:</span>&nbsp;
                <span>
                  {item.timeshift > 0 ? `+${item.timeshift}` : item.timeshift}
                </span>
              </li>
            )}
            <li className="file-info__item has-text-grey-light">
              {formatTime(item.time)}
            </li>
          </ul>
          <TextContent />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(File);
