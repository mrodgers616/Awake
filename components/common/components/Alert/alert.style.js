import styled from 'styled-components';
import { variant } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { colorStyle } from '../customVariant';
import { base } from '../base';

const AlertStyle = styled.div`
  /* Alert default style */
  padding: 20px 25px;
  width: 15%;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: ${themeGet('colors.borderColor', '#dadada')};
  font-size: ${themeGet('fontSizes.4', '16')}px;
  color: #FFFFFF;
  background-color: #32006B;
  margin-right: auto;
  margin-left: auto;
  margin-top: 15px;

  p {
    &:last-child {
      margin-bottom: 0;
      margin-right: auto;
      margin-left: auto;
    }
  }

  /* Material style goes here */
  &.is-material {
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  }

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
