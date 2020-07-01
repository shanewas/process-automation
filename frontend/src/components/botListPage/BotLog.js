import React, { Component } from "react";
import * as electron from "../../electronScript";
import moment from "moment";

export default class BotLog extends Component {
  state = {
    notifications: [],
  };

  componentDidMount() {
    electron.ipcRenderer
      .invoke(electron.MultipleNotificationChannel, 5)
      .then((result) => {
        this.setState({
          notifications: result,
        });
      });

    electron.ipcRenderer.on(
      electron.SingleNotificationChannel,
      (event, notification) => {
        let list = this.state.notifications;
        list.pop();
        list.unshift(notification);
        this.setState({
          notifications: list,
        });
      }
    );
  }

  render() {
    return (
      <div>
        <div className="card m-b-30">
          <div className="card-body">
            <h4 className="mt-0 header-title mb-4">Recent Activity</h4>
            <ol className="activity-feed mb-0">
              {this.state.notifications.map((notification, index) => {
                return (
                  <li className="feed-item" key={index}>
                    <div className="feed-item-list">
                      <p className="text-muted mb-1">
                        {moment(notification.time).fromNow()}
                      </p>
                      <p className="font-15 mt-0 mb-0">
                        <b className="text-primary">{notification.botName}</b>{" "}
                        {notification.message}{" "}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
