import React, { PureComponent } from 'react';

let notifications = null;

class Notifications extends PureComponent {
  state = {
    notifications: []
  };

  componentDidMount() {
    notifications = this;
  }

  addNotification(options) {
    const notification = {
      id: new Date().getTime(),
      type: options.type || '',
      timeout: options.timeout || 3000,
      content: options.content || ''
    };

    this.setState({
      notifications: [...this.state.notifications, notification]
    });

    if (notification.timeout > 0) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, notification.timeout);
    }

    return notification.id;
  }

  removeNotification(id) {
    this.setState({
      notifications: this.state.notifications.filter(
        notification => notification.id !== id
      )
    });
  }

  render() {
    return (
      <div className="notifications">
        {this.state.notifications.map(notification => (
          <div
            className={
              'notification' +
              (notification.type ? ' is-' + notification.type : '')
            }
            key={notification.id}
          >
            <button
              className="delete"
              onClick={() => this.removeNotification(notification.id)}
            />
            {notification.content}
          </div>
        ))}
      </div>
    );
  }
}

export default Notifications;
export { notifications };
