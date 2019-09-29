import React from 'react';
import logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faClock, faBookmark, faBriefcase } from '@fortawesome/free-solid-svg-icons';

class JobItem extends React.Component {
    handleBookmarkClick(id, e) {
        if(typeof this.props.onBookmark === 'function') {
            this.props.onBookmark(id, e);
        }
    }

    render() {
        const job = this.props.job;
        return (
            <li className="job-item">
                <div className="job-item-wrapper">
                    <div className="logo">
                        <img src={logo} className="job-logo" alt="logo" />
                    </div>
                    <div className="content">
                        <div className="title">
                            {job.name}
                        </div>
                        <div className="info">
                            <span className="location">
                                <FontAwesomeIcon icon={faMapMarker} size="xs" className='icon' />
                                {job.location}
                            </span>
                            <span className="type">
                                <FontAwesomeIcon icon={faClock} size="xs" className='icon' />
                                {job.type}
                            </span>
                        </div>
                    </div>
                    <div className="actions">
                        <button
                            className={"r-btn " + (job.bookmarked ? '' : 'primary')}
                            onClick={(e) => this.handleBookmarkClick(job.id, e)}
                        >
                            <FontAwesomeIcon icon={faBookmark} size="xs" className='icon' />
                            {(job.bookmarked ? 'Unbookmark' : 'Bookmark')}
                        </button>
                        <button className="r-btn accent">
                            <FontAwesomeIcon icon={faBriefcase} size="xs" className='icon' />
                            Apply For This Job
                        </button>
                    </div>
                </div>
            </li>
        );
    };
}

export default JobItem;
