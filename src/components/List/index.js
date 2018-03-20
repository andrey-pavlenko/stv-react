import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import Channel from './Channel';

import { getCurrentWeekFileItems } from '../../store/selectors';

// TODO: request list when mount
const ChannelsList = props => (
  <Fragment>
    <Navbar />
    <div className="container">
      {props.items.size > 0 ? (
        props.items
          .groupBy(item => item.id)
          .map((files, id) => <Channel key={id} files={files} />)
          .toArray()
      ) : (
        <div className="center-screen is-size-2 has-text-grey-lighter">
          Нет файлов
        </div>
      )}
    </div>
  </Fragment>
);

const mapStateToProps = state => ({
  items: getCurrentWeekFileItems(state)
});

export default connect(mapStateToProps)(ChannelsList);
