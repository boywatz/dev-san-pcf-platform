export default defineAppConfig({
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  ui: {
    primary: 'main',
    gray: 'main',
    notifications: {
      position: 'top-0 right-0',
    },
  },
});
