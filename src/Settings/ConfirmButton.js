import React from 'react';

import styled from 'styled-components';
import {AppContext} from '../App/AppProvider';
import {fontSize1, greenBoxShadow, color3} from '../Shared/Styles';
const ConfirmButtonStyled = styled.div`
color: ${color3};
margin: 20px;
${fontSize1}
padding: 5px;
cursor: pointer;
&:hover {
    ${greenBoxShadow}
}
`

export const CenterDiv = styled.div`

display: grid;
justify-content: center;
cursor: pointer;

`

export default function (){
    return <AppContext.Consumer>
        {({confirmFavorites}) => 
        <CenterDiv>
            <ConfirmButtonStyled onClick={confirmFavorites}>
            Confirm Favorites
            </ConfirmButtonStyled>
            </CenterDiv>}
    </AppContext.Consumer>
}