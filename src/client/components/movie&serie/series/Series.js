import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { bindActionCreators } from "redux";
import "./Series.scss";
import { SERIESBYGENRE } from "../../../redux/reducers/movieDb";

// Import Actions from MovieApi
import { ActionsMovieConnect } from "../../../redux/actions/moviedb";
import View from '../view/View';

class Series extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueOptions: props.gender.length > 0 ? props.gender[0].id : '',
            movies: props.movies,
            gender: props.gender,
            title: props.gender.length > 0 ? this.props.gender.find(genre => genre.id === parseInt(props.gender[0].id)).name : ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        if(this.props.gender.length > 0) this.props.movieApi.searchSeriesByGender(this.props.gender[0].id);
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.gender) !== JSON.stringify(prevProps.gender)) {
            this.setState({
                ...this.state,
                valueOptions: this.props.gender[0].id,
                gender: this.props.gender,
                title: this.props.gender.find(genre => genre.id === parseInt(this.props.gender[0].id)).name 
            })
            if (this.props.movies.length === 0) {
                this.props.movieApi.searchSeriesByGender(this.props.gender[0].id)
            }
        }
        if (JSON.stringify(this.props.movies) !== JSON.stringify(prevProps.movies)) {
            this.setState({
                ...this.state,
                title: this.props.gender.find(genre => genre.id === parseInt(this.state.valueOptions)).name ,
                movies: this.props.movies
            })
        }
    }

    handleChange(event) {
        this.setState({ 
            ...this.state,
            valueOptions: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.movieApi.searchSeriesByGender(this.state.valueOptions);
    }

    render() {
        return (
            <>
                <form className="pure-form pure-form-stacked">
                    <label htmlFor="state">Gender :</label>
                    <select id="state" defaultValue={this.state.valueOptions} onChange={this.handleChange}>
                        {this.state.gender.map((genre, index) => <option key={index} value={genre.id}>{genre.name}</option>)}
                    </select>
                    <button type="button" onClick={this.handleSubmit} className="pure-button pure-button-primary">Search</button>
                </form>
                <View videos={this.state.movies} listName={SERIESBYGENRE} genderTitle={this.state.title} />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movieDb.SERIESBYGENRE,
        gender: state.movieDb.genres.serie
    };
}



const mapDispatchToProps = dispatch => {
    return {
        actions: {
            redirectToAbout: () => dispatch(push("about"))
        },
        movieApi: bindActionCreators(ActionsMovieConnect, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Series)