import React, { Component } from 'react';
import ContactList from './component/ContactList';
import './App.css';
import $ from 'jquery';
import {PropTypes} from "prop-types";
const dataURL = window.location.protocol + '//' + window.location.host + '/' + window.location.pathname;

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      contacts:[],
        loading: false
    }
  }

  componentDidMount(){
        this.setState.loading = true;
        const URL = dataURL +'date/date.json';
      $.ajax({
          url: URL,
          dataType: 'json',
          cache: false,
          success: function(result) {
              console.log('Data of page:' + JSON.stringify(result.contactlist));
              this.setState({
                  contacts: result.contactlist,
                  loading: false
              });
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });

  }


  render() {
      const { contacts, loading} =this.state;
      console.log('Contact:' + JSON.stringify(contacts));
      console.log('loading:' + loading);

    return (
        <div className='container'>
          <div className='row'>
            <div className='panel panel-default'>
                <div className='panel-heading'><h1>Contact Tree</h1></div>
              <div className='panel-body'>
            {
                (loading)?
                    <p>Loading Contact List...</p> :
                    <ul><ContactList key={'cnt'} contactlist ={contacts} parent={0}/></ul>

            }
              </div>
            </div>
          </div>
        </div>
    );
  }
}

App.propTypes={
    contacts: PropTypes.array,
    loading: PropTypes.bool
}
App.defaultProps={
    contacts: [],
    loading: false
}

export default App;
