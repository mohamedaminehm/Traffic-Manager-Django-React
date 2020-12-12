import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addlead } from '../../actions/leads';
import axios from 'axios';

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Typography from '@material-ui/core/Typography';

import './leads.css';


export class Form extends Component {
    state = {
        name: '',
        cin: '',
        objet: '',
        file: null,
        
    };

    static propTypes = {
        addlead: PropTypes.func.isRequired
    };

    handleFileChange = (e) => {
        e.preventDefault();
        this.setState({
            file : e.target.files[0],
        });
    };


    onChange = e => this.setState({ [e.target.name]:
    e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        if (this.state.file){
            form_data.append('file' , this.state.file , this.state.file.name);
        }
        else {form_data.append('file' , this.state.file ); }
        form_data.append('name', this.state.name);
        form_data.append('cin',this.state.cin);
        form_data.append('objet',this.state.objet);
        axios.post('/api/leads/' , form_data, {
            
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : `Token ${localStorage.getItem('token')}`
            }

        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
            this.setState({
                name:"",
                cin:0,
                objet:'',
                file : null
    
            });
    };

    

    render() {
        const {name, cin , objet} = this.state;
        return (
            <div className="cardform card-body mt-4 mb-4">
                
                <h2><strong> Envoyer une demande à l'administration ici : </strong></h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nom</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="name"
                            onChange={this.onChange}
                            value={name}
                        />
                    </div>
                    <div className="form-group">
                        <label>cin</label>
                        <input 
                            className="form-control"
                            type="number"
                            name="cin"
                            onChange={this.onChange}
                            value={cin}
                        />

                    </div>
                    <div className="form-group">
                        <label>[OBJET]</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="objet"
                            onChange={this.onChange}
                            value={objet}
                        />

                    </div>
                    <div className="form-group">
                        <label> <PictureAsPdfIcon/>Votre demande sous format PDF </label>
                        <input 
                            className="form-control"
                            type="file"
                            
                            accept = "application/pdf"
                            name="file"
                            onChange={this.handleFileChange}
                            required
                        />

                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Envoyer
                        </button>

                    </div>


                </form>
            </div>
        )
    }
}

export default connect(null , { addlead })(Form);




//accept="application/pdf"

/*let lead = new FormData();
lead.append('name' , name);
lead.append('cin' , cin);
lead.append('objet' , objet);
if (this.state.file){
    lead.append('file' ,file, file.name);
}
else {lead.append('file' , file ); 
}*/
