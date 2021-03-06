import React, { Component } from 'react';
import {Link} from '@reach/router'
import * as api from '../utils/api'
import Voting from './Voting';
import Spinners from '../utils/spinners';
import Errors from '../utils/errors';

class OneArticle extends Component {
    state = {
        voteChange: 0,
        isLoading: true,
        article: null,
        error: null
    }
    render() {
        const {isLoading, article, error} =this.state
        if(error) return <Errors error={error}/>
        if(isLoading) return <Spinners />
        return (
            <div className='indvArticle'>
                <h2>{article.title}</h2>
                <p>Author: {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Written on: {new Date(article.created_at).toLocaleDateString()}</p>
                <p>{article.body}</p>
                <Voting votes={article.votes} article_id={article.article_id}/>
                <Link to={`/comments/${article.article_id}`}>See all comments({article.comment_count})</Link>
                <br></br>
                <Link to='/articles'>Back to all articles&nbsp;</Link>
            </div>
        );
    }
    componentDidMount(){
        api.fetchOneArticle(this.props.article_id)
        .then(article => {
            this.setState({article, isLoading:false})
        })
        .catch(error => {
          this.setState({error})
        })
    }
    // handleClick = (event) => {
    //     event.preventDefault()
    //     const {value} = event.target
    //     const {article_id} = this.state.article
    //     this.setState(({voteChange}) => {
    //         return {
    //             voteChange: voteChange + +value
    //         }
    //     })
    //     api.patchVote(value, article_id)
    // }
}

export default OneArticle;