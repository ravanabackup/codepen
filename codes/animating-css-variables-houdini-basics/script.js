if (window.CSS && CSS.registerProperty) {
  document.documentElement.classList.add('supported');
  
  ['x1','x2','y1','y2','z1','z2']
    .forEach(prop => {
      CSS.registerProperty({
        name: `--r${prop}`,
        syntax: '<angle>',
        inherits: false,
        initialValue: '0deg'
      });
    });
}