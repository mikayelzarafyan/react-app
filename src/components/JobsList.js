import React from 'react';
import JobItem from './JobItem';

class JobsList extends React.Component {
    render() {
        const jobs = this.props.jobs;
        return (
            <div className="jobs-list-wrapper">
                <ul>
                    {jobs.map((job) =>
                        <JobItem
                            key={job.id.toString()}
                            job={job}
                            onBookmark={this.props.onBookmark}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

export default JobsList;
