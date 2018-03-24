import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';
import TextContent from './TextContent';
import { getFileItem as stateGetFileItem } from '../../store/selectors';
import { week as formatWeek, time as formatTime } from '../../modules/format';
import { fileAddViewed, fileAddDownloaded } from '../../store/actions';

import { notifications } from '../Notifications';

class File extends PureComponent {
  state = {
    item: null,
    pending: false,
    content: '',
    error: null
  };

  // TODO: network error 503 not catched
  componentWillMount() {
    const urlId = parseInt(this.props.match.params.urlId, 10);
    if (!isNaN(urlId)) {
      const item = stateGetFileItem(urlId);
      if (item) {
        // FIXME: Fake request
        const url = '/tv.txt';
        // const url =
        //   'https://thingproxy.freeboard.io/fetch/http://xmltv.s-tv.ru' +
        //   item.url;
        this.setState({ item: item, pending: true });
        axios
          .get(url)
          .then(response => {
            this.setState({ pending: false, content: response.data });
            this.props.fileAddViewed(item.urlId);
          })
          .catch(error => {
            this.setState({ pending: false });
            notifications.networkError(error);
          });
      }
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(this.state.content)
    );
    const fileName = this.state.item.name;
    element.setAttribute('download', `${fileName}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    this.props.fileAddDownloaded(this.state.item.urlId);
  };

  render() {
    if (!this.state.item) {
      return <Redirect to="/" />;
    }

    // TODO: get rename channel
    const { name, id, week, variant, type, timeshift, time } = this.state.item;

    return (
      <Fragment>
        <Navbar name={name} id={id} handleDownload={this.handleDownload} />
        <div className="container">
          <ul className="file-info">
            <li className="file-info__item">{formatWeek(week)}</li>
            <li className="file-info__item">
              <span>{variant}</span>
              {type && <code>{type}</code>}
            </li>
            {timeshift !== 0 && (
              <li className="file-info__item">
                <span className="has-text-grey-light">Пояс:</span>&nbsp;
                <span>{timeshift > 0 ? `+${timeshift}` : timeshift}</span>
              </li>
            )}
            <li className="file-info__item has-text-grey-light">
              {formatTime(time)}
            </li>
          </ul>
          {this.state.pending ? (
            <div className="file__pending" />
          ) : (
            this.state.content && <TextContent content={this.state.content} />
          )}
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fileAddViewed: urlId => dispatch(fileAddViewed(urlId)),
  fileAddDownloaded: urlId => dispatch(fileAddDownloaded(urlId))
});

export default connect(null, mapDispatchToProps)(File);
