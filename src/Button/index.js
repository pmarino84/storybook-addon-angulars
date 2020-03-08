import ng from 'angular';
import Button from './Button';

console.log("Button static configuration: ", Button.meta);

const ButtonModule = ng.module('pm.button', []);

ButtonModule.component(Button.meta.name, Button.meta);

export default ButtonModule;

export {
  Button
};
