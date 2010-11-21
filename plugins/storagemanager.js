// Wrapper around localStorage
var StorageManager = function() {
  
};

StorageManager.prototype.clearAll = function() {
  // clear all things from the storage
};

StorageManager.prototype.set = function(key, value) {
  localStorage[key] = JSON.stringify(value);
};

StorageManager.prototype.get = function(key) {
  return JSON.parse(localStorage[key]);
};

StorageManager.prototype.has = function(key) {
  return localStorage[key] !== undefined;
};
