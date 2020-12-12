import axios from'axios';

import { GET_LEADS , DELETE_LEAD , ADD_LEAD } from './types';

import { createMessage , returnErrors } from './messages';
import { tokenConfig , tokenConfigForm } from './auth';

//GET LEADS
export const getLeads = () => ( dispatch, getState) => {
    axios
        .get('/api/leads/' , tokenConfig(getState))
        .then(res => {
            dispatch({
                type : GET_LEADS,
                payload : res.data
            });
        })
        .catch(err =>  dispatch(returnErrors(err.response.data, err.response.status)));
};

//DELETE LEAD
export const deletelead = (id) => (dispatch , getState) => {
    axios
        .delete(`/api/leads/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch( createMessage({deletelead: 'supprimé de l`historique'
        }));
            dispatch({
                type : DELETE_LEAD,
                payload : id
            });
        })
        .catch(err => console.log(err));
};

//ADD LEAD
export const addlead = (lead) => (dispatch, getState) => {
    axios
        .post("/api/leads/",lead, tokenConfig(getState))
        .then(res => {
            dispatch( createMessage({addlead: 'demande envoyé'
        }));
            dispatch({
                type : ADD_LEAD,
                payload : res.data
            });
        })
        .catch(err =>  dispatch(returnErrors(err.response.data, err.response.status)));

};


