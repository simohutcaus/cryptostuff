import styled from 'styled-components';

import {subtleBoxShadow, lightBlueBackground, greenBoxShadow, redBoxShadow} from '../Shared/Styles';


export const Tile = styled.div`
padding: 10px;
${subtleBoxShadow}

}

`
export const SelectableTile = styled(Tile)`

&:hover {
    cusor: pointer;
    ${greenBoxShadow}
}

`

export const DeletableTile = styled(Tile)`

&:hover { 
    cursor: pointer;
    ${redBoxShadow}
}

`
export const DisabledTile = styled(Tile)`

pointer-events: none;
opacity: 0.4;

}


`