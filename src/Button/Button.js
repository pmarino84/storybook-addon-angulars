import Component from '../decorators/Component';

@Component({
  name: 'pmButton',
  transclude: true,
  template: '<button class="pm-button" ng-click="$ctrl.handleClick($event)" ng-transclude></button>',
  bindings: {
    onClick: '&'
  }
})
export default class Button {
  static $inject = [];

  handleClick($event) {
    this.onClick && this.onClick($event);
  }
}
