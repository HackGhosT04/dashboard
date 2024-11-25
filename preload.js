// Example: Expose APIs to the renderer process
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  // Add methods here
});
