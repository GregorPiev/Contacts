import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import './ContactList.css';
import Contact from './Contact';
import $ from 'jquery';

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactlist: this.props.contactlist,
            parent: this.props.parent
        }
        this.renderContactList = this.renderContactList.bind(this);
        this.handleShowChilds = this.handleShowChilds.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({contactlist: nextProps.contactlist})
    }

    handleShowChilds(child){
        const wrapperId = child.props.id;
        console.info("Child: ",child);
        if($("#" + wrapperId).length>0){
            $("#" + wrapperId).toggle('slow');
        }
    }


    renderContactList() {
        const { contactlist } = this.state;
        let  { parent } = this.state;
        console.log("Parent: ",parent);
        return contactlist.map((contact, i) => {

            if (contact.contacts) {
                return (
                    <div>
                        <Contact handleShowChilds={this.handleShowChilds} parent={parent} key={contact.id} id={contact.id} name={contact.name}/>
                        <ul id={contact.id} className='wrapper-child'>
                            <ContactList parent={1} key={'ctlch' +i} id={contact.id} contactlist={contact.contacts}/>
                        </ul>
                    </div>
                );
            } else {
                return (<Contact handleShowChilds={this.handleShowChilds} parent={parent} key={contact.id} id={contact.id} name={contact.name}/>)
            }

        });
    }

    render() {
        const {contactlist} = this.state;
        return (
            (contactlist.length === 0) ?
                <p>Loading....</p> :
                this.renderContactList()
        );
    }
}

ContactList.propTypes = {
    contactlist: PropTypes.array,
    parent: PropTypes.number
}
ContactList.defaultProps = {
    contactlist: [],
    parent: 0
}
export default ContactList;
