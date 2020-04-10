import React, { Component } from 'react'

export default class BotLog extends Component {
    render() {
        return (
            <div>
                <div className="card m-b-30">
                <div className="card-body">
                    <h4 className="mt-0 header-title mb-4">Recent Activity</h4>
                    <ol className="activity-feed mb-0">
                    <li className="feed-item">
                        <div className="feed-item-list">
                        <p className="text-muted mb-1">Now</p>
                        <p className="font-15 mt-0 mb-0">Andrei Coman magna sed porta finibus, risus posted a new article: <b className="text-primary">Forget UX Rowland</b></p>
                        </div>
                    </li>
                    <li className="feed-item">
                        <p className="text-muted mb-1">Yesterday</p>
                        <p className="font-15 mt-0 mb-0">Andrei Coman posted a new article: <b className="text-primary">Designer Alex</b></p>
                    </li>
                    <li className="feed-item">
                        <p className="text-muted mb-1">2:30PM</p>
                        <p className="font-15 mt-0 mb-0">Zack Wetass, sed porta finibus, risus  Chris Wallace Commented <b className="text-primary"> Developer Moreno</b></p>
                    </li>
                    </ol>
                </div>
                </div>

            </div>
        )
    }
}
