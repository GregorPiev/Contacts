import React , {Component} from 'react';
import { PropTypes } from 'prop-types';
import './Contact.css';

class Contact extends Component{
    constructor(props){
        super(props);
        this.state ={
            contacname: this.props.name,
            id: this.props.id,
            parent: this.props.parent,
            showChilds: this.props.handleShowChilds
        }
        this.showChilds = this.showChilds.bind(this);
    }

    showChilds(){
        this.props.handleShowChilds(this);
    }

    render(){
      const { contacname , id , parent } = this.state;
      let cls =(parent===0)? 'parent-item':'child-item';
      return(
        <li onClick={this.showChilds} className={cls} key={id}>{contacname}</li>
      );
    }
}

Contact.propTypes={
    contacname: PropTypes.string,
    id: PropTypes.number,
    cls: PropTypes.string,
    parent: PropTypes.number
}
Contact.defaultProps={
    contacname:'',
    id: 0,
    cls: 'child-item',
    parent: 0
}
export default Contact;
