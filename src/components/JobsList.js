import React from 'react';
import JobItem from './JobItem';

class JobsList extends React.Component {
    render() {
        const jobs = this.props.jobs;
        return (
            <div className="jobs-list-wrapper">
                <div className="list-info">
                    <span>Showing {jobs.length} of {this.props.allJobsCount}</span>
                </div>
                <ul>
                    {jobs.map((job) =>
                        <JobItem
                            key={job.id.toString()}
                            job={job}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

export default JobsList;
