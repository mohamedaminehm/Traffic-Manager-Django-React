import React, { Component } from 'react';
import axios from 'axios';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';




export class Create extends Component {

    state = {
        title : '',
        content : '',
        image : null
    };

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };
    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };
    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        if (this.state.image){
            form_data.append('image' , this.state.image , this.state.image.name);
        }
        else {form_data.append('image' , this.state.image ); }
        form_data.append('title', this.state.title);
        form_data.append('content',this.state.content);
        axios.post('/api_post/posts/' , form_data , {
            headers: {
                "content-type" : "multipart/form-data"
            }
        } )
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
        this.setState({
            title : '',
            content:'',
            image : null
        });
    };

    render() {
        const { title , content } = this.state ;
        return (
            <div className="card card-body mt-4 mb-4" >
                <h2> Créer une publication </h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Le titre</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="title"
                            onChange={this.onChange}
                            value={title}
                        />
                    </div>
                    <div className="form-group">
                        <label>Le contenu</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="content"
                            onChange={this.onChange}
                            value={content}
                        />

                    </div>
                    <div className="form-group">
                        <label><PhotoSizeSelectActualIcon/>Entrez une image si vous voulez</label>
                        <input 
                            className="form-control"
                            type="file"
                            accept="image/png, image/jpeg"
                            name="image"
                            onChange={this.handleImageChange}
                            
                        />

                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>

                    </div>


                </form>
            </div>
        )
    }
}

export default Create;
