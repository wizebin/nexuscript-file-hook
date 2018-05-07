import * as fs from 'fs';

export default class FileChangeListener {
  constructor() {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.setProperties = this.setProperties.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  setProperties({ path, recursive }, callback) {
    this.path = path;
    this.recursive = recursive;
    this.callback = callback;
  }

  start() {
    if (this.watcher) return false;
    this.watcher = fs.watch(this.path, { recursive: this.recursive }, this.onChange);
    return true;
  }

  onChange(action, filename) {
    this.callback({ action, filename, type: 'filechange', time: new Date().toISOString() });
  }

  stop() {
    if (this.watcher) {
      this.watcher.close();
      return true;
      this.watcher = null;
    }
    return false;
  }
}
