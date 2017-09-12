export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (component) {
    // Object.defineProperty(component, 'dispatch', {
    //   get () {
    //     return this.$root.$props.dispatch
    //   },
    //   enumerable: true,
    //   configurable: false
    // })
    console.log(Object.keys(component));
    return component;
  };
}