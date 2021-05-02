import ng from 'angular';

// const getInjector = (moduleName) => ng.injector(['ng', moduleName]);

const bootstrapApp = (el, moduleName) => ng.bootstrap(el, [moduleName]);

const createContainer = () => document.createElement('div');

function makeInternalModule(componentName, componentConfiguration) {
  const moduleName = 'temp' + componentName;
  const tempModule = ng.module(moduleName, []);
  tempModule.component(componentName, componentConfiguration);
  return tempModule;
}

function templateProcessor(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    const prop = i < values.length ? "_prop" + i : "";

    acc.template += str + prop;

    if (i < values.length) {
      acc.scope[prop] = values[i];
    }

    return acc;
  }, { template: '', scope: {} });
}

function createCompiler($el, template, props = {}) {
  function compiler($compile, $rootScope) {
    return () => {
      // let $scope = $rootScope.$new(true);
      let $scope = $el.scope() || $rootScope;
      $compile($el.html(template))({ ...$scope, props }/* , () => $rootScope.digest() */);
      $rootScope.digest();
    }
  }
  compiler.$inject = ['$compile', '$rootScope'];

  return compiler;
}

export function forComponentV2(componentName, componentConfiguration) {
  function createElement(builder) {
    let tempModule = makeInternalModule(componentName, componentConfiguration);

    let container = createContainer();
    const { template, scope } = builder(templateProcessor);
    bootstrapApp(container, tempModule.name);

    const $element = ng.element(container);
    const $injector = $element.injector();

    const compiler = createCompiler($element, template, scope);

    $injector.invoke(compiler);

    return container;
  }

  return {
    createElement
  }
}

export function fromModule(ngModule) {
  function createElement(template) {
    let container = createContainer();
    container.innerHTML = template;

    bootstrapApp(container, ngModule.name);

    return container;
  }

  return {
    createElement
  }
}

export function forComponent(componentName, componentConfiguration) {
  function createElement(template) {
    let tempModule = makeInternalModule(componentName, componentConfiguration);

    let container = createContainer();
    container.innerHTML = template;

    bootstrapApp(container, tempModule.name);

    return container;
  }

  return {
    createElement
  }
}
