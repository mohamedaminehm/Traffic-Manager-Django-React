import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads, deletelead } from '../../actions/leads';
import Typography from '@material-ui/core/Typography';
import './leads.css'

export class Leads extends Component {
    static propTypes = {
        leads : PropTypes.array.isRequired,
        getLeads:PropTypes.func.isRequired,
        deletelead:PropTypes.func.isRequired
    };

    componentDidMount(){
        this.props.getLeads();
    }
    render() {
        return (
            <div className="container1">
                
                <h2><strong>Historique de votre demandes</strong></h2>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            
                            <th>Nom</th>
                            <th>CIN</th>
                            <th>Object</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.leads.map(lead => (
                         <tr key={lead.id}>
                             
                             <td>{lead.name}</td>
                             <td>{lead.cin}</td>
                             <td>{lead.objet}</td>
                             <td>
                                 <button onClick={this.props.deletelead.bind(this , lead.id)}className="btn btn-danger btn-sm">
                                 {""}
                                 Effacer
                                 </button>
                            </td>
                         </tr>   
                        ))}
                    </tbody>
                </table>
                </div>
        )
    }
}
const mapStateToProps = state => ({
    leads : state.leads.leads
});

export default connect(mapStateToProps , { getLeads, deletelead })(Leads);
