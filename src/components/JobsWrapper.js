import React from 'react';
import JobsList from './JobsList';
import Filters from './Filters';
import AdvancedSearch from './AdvancedSearch';

const CATEGORIES = [
    {programming: 'Programming'},
    {design: 'Design'},
];

const TYPES = [
    {full: 'Full Time'},
    {per: 'Per Task'},
    {part: 'Part Time'},
];

const LOCATION = [
    {yerevan: 'Yerevan'},
    {amsterdam: 'Amsterdam'},
    {usaLa: 'USA LA'},
    {usaNewYork: 'New York'}
];

const JOBS =  [
    {id: 1, category: 'programming', price: '$20', bookmarked: true, name: 'JS Developer', location: 'yerevan', type: 'full'},
    {id: 2, category: 'programming', price: '$50', bookmarked: true, name: 'JS Developer', location: 'amsterdam', type: 'full'},
    {id: 3, category: 'design', price: '$30', bookmarked: false, name: 'UX Designer', location: 'amsterdam', type: 'full'},
    {id: 4, category: 'programming', price: '$50', bookmarked: true, name: 'Full Stack', location: 'usaLa', type: 'part'},
    {id: 5, category: 'design', price: '$30', bookmarked: false, name: 'UX Designer', location: 'usaNewYork', type: 'full'},
    {id: 6, category: 'programming', price: '$20', bookmarked: true, name: 'JAVA Developer', location: 'amsterdam', type: 'part'}
];

class JobsWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.handleBookmark = this.handleBookmark.bind(this);
        this.state = {jobs: JOBS};
    }

    handleBookmark(id, e) {
        let jobs = this.state.jobs;

        jobs.map((item) => {
            if(item.id === id) {
                item.bookmarked = !item.bookmarked;
            }

            return item;
        });

        this.setState({jobs});
    }

    render() {
        const jobs = this.state.jobs;
        return (
            <div className="jobs-main-container">
                <Filters
                    categories={CATEGORIES}
                    location={LOCATION}
                />
                <div>
                    <AdvancedSearch
                        categories={CATEGORIES}
                        location={LOCATION}
                        types={TYPES}
                    />
                </div>
                <JobsList
                    jobs={jobs}
                    onBookmark={this.handleBookmark}
                />
            </div>
        );
    }
}

export default JobsWrapper;
