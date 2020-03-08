export default function Module({ name, components = [], depencencies = [] }) {
  return function decorator(clazz) {
    clazz.meta = options;
    return clazz;
  }
}