import React, { Component } from 'react';
import CardList from '../components/CardList';
// import { robots } from './robots';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
        // console.log('constructor');
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => {
           return response.json();
        }).then(users => {
            this.setState({ robots: users })
        });
      
        // console.log('componentDidMount');
    }

    onSearchChange = (event) => {

        this.setState({ searchfield: event.target.value })
    
    }

    render() {

        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {     
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })

        if (!robots.length) {  
            // robots.length === 0
            return <h1>Loading.....</h1>
        } else {
             // console.log('render');
        return (
            <div className="tc">
                <h1 className="f1">R o b o - F r i e n d s</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                    
                </Scroll>
                
            </div>
        );
        
        }

       
    }
    
}

export default App;