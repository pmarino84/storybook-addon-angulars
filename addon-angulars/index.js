import ng from 'angular';

const getInjector = (moduleName) => ng.injector(['ng', moduleName]);

const bootstrapApp = (el, moduleName) => ng.bootstrap(el, [moduleName]);

const createContainer = () => document.createElement('div');

function makeInternalModule(componentName, componentConfiguration) {
  const moduleName = 'temp' + componentName;
  const tempModule = ng.module(moduleName, []);
  tempModule.component(componentName, componentConfiguration);
  return tempModule;
}

// function compiler($compile, $rootScope) {
//   return function compiler(template) { }
// }
// compiler.$inject = ['$compile', '$rootScope'];

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

function compile($compile, $rootScope, template, cloneAttachFn) {
  let $scope = $rootScope.$new(true);
  let el = ng.element(template);
  // $compile(el)($scope, (clonedElement, scope) => { });
  $compile(el)($scope, cloneAttachFn);
}

export function forComponentV2(componentName, componentConfiguration) {
  function createElement(builder) {
    // return () => {
    let tempModule = makeInternalModule(componentName, componentConfiguration);
    let container = createContainer();
    const { template, scope } = builder(templateProcessor);
    console.log("Template processed: ", { template, scope });
    // container.innerHTML = template;
    bootstrapApp(container, tempModule.name);

    return container;
    // };
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
