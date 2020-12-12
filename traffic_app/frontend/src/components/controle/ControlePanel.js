import React, { Component } from 'react';
import ChoiceMenu from './ChoiceMenu';
import ChoiseMenu from './ChoiceMenu';
export class ControlePanel extends Component {
    render() {
        return (
            <div>
                <h1 style={{ text : 'center' }} > Bienvenue Mr/Mme :)  </h1>
                <h2 style={{ text : 'center' }} >L'administration vous a donné la responsabilité de controle de carfour de Bardo1 </h2><br/>
                
                <ChoiseMenu />
            </div>
        )
    }
}

export default ControlePanel
