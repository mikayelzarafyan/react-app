import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faClock, faBookmark, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { TYPES, LOCATION } from '../utils/constants';
import {DBOperations} from "../services/DBService";

class JobItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            job: this.props.job,
        };
    }

    /**
     * Toggle Job state by bookmark
     */
    async handleBookmarkClick() {
        const job = this.state.job;
        job.bookmarked = !job.bookmarked;
        await this.setState({job: job});
        await DBOperations.set(job);
    }

    render() {
        const job = this.props.job;
        const location = LOCATION.find(item => item.key === job.location);
        const type = TYPES.find(item => item.key === job.type);
        return (
            <li className="job-item">
                <div className="job-item-wrapper">
                    {job.img ? (
                        <div className="logo">
                            <img src={job.img} className="job-logo" alt="logo" />
                        </div>
                    ) : ''}
                    <div className="content">
                        <div className="title">
                            {job.name}
                        </div>
                        <div className="info">
                            <span className="location">
                                <FontAwesomeIcon icon={faMapMarker} size="xs" className='icon' />
                                {location.value}
                            </span>
                            <span className="type">
                                <FontAwesomeIcon icon={faClock} size="xs" className='icon' />
                                {type.value}
                            </span>
                        </div>
                    </div>
                    <div className="actions">
                        <button
                            className={"r-btn " + (job.bookmarked ? '' : 'primary')}
                            onClick={() => this.handleBookmarkClick()}
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
