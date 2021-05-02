export default function Component(options) {
  return function decorator(clazz) {
    clazz.meta = { ...options, controller: clazz };
    return clazz;
  }
}