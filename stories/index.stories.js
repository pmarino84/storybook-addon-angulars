import { forComponent, forComponentV2 } from '../addon-angulars';
import LibButton from '../src/Button/Button';
import centered from '@storybook/addon-centered/html';

import { action } from '@storybook/addon-actions';

export default {
  title: 'AngularJS Demo',
  decorators: [centered]
}

export const Button = () => {
  return forComponent(LibButton.meta.name, LibButton.meta).createElement(`<pm-button>wrapped button</pm-button>`);
};

export const Button2 = () => {
  return forComponentV2(LibButton.meta.name, LibButton.meta).createElement(compile => {
    let handleClick = action('click');
    return compile`<pm-button on-click="${handleClick}($event)">wrapped button</pm-button>`;
  });
};