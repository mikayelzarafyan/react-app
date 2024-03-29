import React from 'react';
import JobsList from './JobsList';
import Filters from './Filters';
import AdvancedSearch from './AdvancedSearch';
import { DBOperations } from '../services/DBService';

class JobsWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleOnSearchInput = this.handleOnSearchInput.bind(this);
        this.handleAdvancedFilter = this.handleAdvancedFilter.bind(this);
        this.state = {
            jobs: [],
            allJobs: [],
            filterLocation: 'all',
            filterCategory: 'all',
            filterSearch: '',
            selectedCategories: [],
            selectedLocation: [],
            selectedTypes: [],
        };

        this._getAllJobs();
    }

    /**
     * Get All Jobs From Index Db
     * @private
     */
    _getAllJobs() {
        DBOperations.getAll().then(async jobs => {
            await this.setState({ jobs: jobs });
            await this.setState({ allJobs: jobs });
        });
    }

    /**
     * Change Search Input Value on change event
     * @param value
     * @returns {Promise<void>}
     */
    async handleOnSearchInput(value) {
        await this.setState({ filterSearch: value });
    }

    /**
     * Function to filter jobs (Advanced Search)
     * @param value
     * @param selected
     * @param filterType
     * @returns {Promise<void>}
     */
    async handleAdvancedFilter(value, selected, filterType) {
        let newJobs = this.state.allJobs;

        if(filterType === 'location') {
            if(selected) {
                await this.setState({ selectedLocation: [...this.state.selectedLocation, value] });
            } else {
                await this.setState({ selectedLocation: this.state.selectedLocation.filter(item => item !== value) });
            }
        } else if(filterType === 'categories') {
            if(selected) {
                await this.setState({ selectedCategories: [...this.state.selectedCategories, value] });
            } else {
                await this.setState({ selectedCategories: this.state.selectedCategories.filter(item => item !== value) });
            }
        } else if(filterType === 'type') {
            if(selected) {
                await this.setState({ selectedTypes: [...this.state.selectedTypes, value] });
            } else {
                await this.setState({ selectedTypes: this.state.selectedTypes.filter(item => item !== value) });
            }
        }

        if(this.state.selectedLocation.length) {
            newJobs = newJobs.filter((item) => {
                if(this.state.selectedLocation.includes(item.location)) {
                    return true;
                }

                return false;
            });
        }

        if(this.state.selectedCategories.length) {
            newJobs = newJobs.filter((item) => {
                if(this.state.selectedCategories.includes(item.category)) {
                    return true;
                }

                return false;
            });
        }

        if(this.state.selectedTypes.length) {
            newJobs = newJobs.filter((item) => {
                if(this.state.selectedTypes.includes(item.type)) {
                    return true;
                }

                return false;
            });
        }

        await this.setState({
            filterLocation: 'all',
            filterCategory: 'all',
            filterSearch: '',
            jobs: newJobs
        });
    }

    /**
     * Function to filter jobs by main filters and search
     * @param value
     * @param type
     * @returns {Promise<void>}
     */
    async handleFilter(value, type) {
        let newJobs = this.state.allJobs;

        if(type === 'location') {
            await this.setState({ filterLocation: value })
        } else if(type === 'categories') {
            await this.setState({ filterCategory: value });
        } else if(type === 'search') {
            await this.setState({ filterSearch: value })
        }

        if(this.state.filterLocation !== 'all') {
            newJobs = newJobs.filter((item) => {
                if(item.location === this.state.filterLocation) {
                    return true;
                }

                return false;
            });
        }
        if(this.state.filterCategory !== 'all') {
            newJobs = newJobs.filter((item) => {
                if(item.category === this.state.filterCategory) {
                    return true;
                }

                return false;
            });
        }

        if(this.state.filterSearch.trim() !== '') {
            newJobs = newJobs.filter((item) => {
                if(item.name.toLowerCase().indexOf(this.state.filterSearch.toLowerCase()) !== -1) {
                    return true;
                }

                return false;
            });
        }

        await this.setState({
            selectedLocation: [],
            selectedCategories: [],
            selectedTypes: [],
            jobs: newJobs
        });
    }

    render() {
        const jobs = this.state.jobs;
        return (
            <div className="jobs-main-container">
                <h2 className="title">Jobs Page</h2>
                <Filters
                    onFilter={this.handleFilter}
                    onInput={this.handleOnSearchInput}
                    filterLocation={this.state.filterLocation}
                    filterCategory={this.state.filterCategory}
                    filterSearch={this.state.filterSearch}
                />
                <div className="jobs-content">
                    <AdvancedSearch
                        onFilter={this.handleFilter}
                        handleAdvancedFilter={this.handleAdvancedFilter}
                        selectedLocation={this.state.selectedLocation}
                        selectedCategories={this.state.selectedCategories}
                        selectedTypes={this.state.selectedTypes}
                    />
                    <JobsList
                        jobs={jobs}
                        allJobsCount={this.state.allJobs.length}
                    />
                </div>
            </div>
        );
    }
}

export default JobsWrapper;
