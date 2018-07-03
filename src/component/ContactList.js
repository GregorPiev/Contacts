import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import './ContactList.css';
import Contact from './Contact';

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactlist: this.props.contactlist,
            parent: this.props.parent,
            contactvalue:[],
            contactvalueid: 0,
            itemID: 0
        }
        this.renderContactList = this.renderContactList.bind(this);
        this.handleShowChilds = this.handleShowChilds.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({contactlist: nextProps.contactlist})
    }

    handleShowChilds(child){
        if(child.props.parent===2) return;

        const { itemID } = this.state;
        let wrapperId;
        const contacts = child.props.contacts;
        let curItemId = child.props.id;

        let par;
        let obj=[];
        let sun_obj=(child.props.parent===1)? this.state.contactvalue:[];

        if (contacts && curItemId!==itemID) {
            obj=contacts.map((item)=> {
                      par = (item.contacts) ? 1 : 2;
                 return   <Contact handleShowChilds={this.handleShowChilds} parent={par} key={item.id} id={item.id}
                             name={item.name} contacts={item.contacts}/>
                }
            );
        }else{
            curItemId=0;
        }
        if(sun_obj.length>0){
            let new_obj = sun_obj.filter((elem)=>{
                return !Array.isArray(elem);
            });
            new_obj.push(obj);
            sun_obj = new_obj;
            wrapperId =this.state.contactvalueid;
        }else{
            sun_obj = obj;
            wrapperId =child.props.id;
        }

        this.setState({contactvalue: sun_obj, contactvalueid: wrapperId, itemID: curItemId});
    }


    renderContactList() {
        const { contactlist, contactvalue, contactvalueid } = this.state;
        return contactlist.map((contact, i) => {
            let contactlist =(contact.contacts)?contact.contacts:[];
            let paren = (contact.contacts) ? 0 : 2;
                return (
                    <div>
                    <Contact handleShowChilds={this.handleShowChilds} parent={paren} key={contact.id} id={contact.id} name={contact.name} contacts={contactlist}/>
                        <ul className='wrapper-child'>{ contact.id===contactvalueid? contactvalue :'' }</ul>
                    </div>
                )
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
    parent: PropTypes.number,
    contactvalue:PropTypes.array,
    contactvalueid: PropTypes.number
}
ContactList.defaultProps = {
    contactlist: [],
    parent: 0,
    contactvalue:[],
    contactvalueid: 0
}
export default ContactList;
