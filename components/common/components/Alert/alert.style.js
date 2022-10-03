import styled from 'styled-components';
import { variant } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { colorStyle } from '../customVariant';
import { base } from '../base';

const AlertStyle = styled.div`
  /* Alert default style */
  padding: 60px 25px;
  width: 15%;
  font-size: ${themeGet('fontSizes.4', '16')}px;
  color: #000000;
  margin-left: 55%;
  margin-top: -70px;

  p {
    &:last-child {
      margin-bottom: 0;
      margin-right: auto;
      margin-left: auto;
    }
  }

  /* Material style goes here */
  

  /* Style system custome color variant */
  ${colorStyle}
  ${base}
`;

// prop types can also be added from the style functions
AlertStyle.propTypes = {
  ...variant.propTypes,
};

AlertStyle.displayName = 'AlertStyle';

export default AlertStyle;
