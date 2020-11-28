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

