import { wrapHook } from 'nexusdk';
import * as fs from 'fs';
import path from 'path';

export default wrapHook((properties, messages) => {
  const { trigger } = messages;
  const { path: location, recursive } = properties;

  const watcher = fs.watch(location, { recursive }, (action, filename) => {
    trigger({ action, filename: path.join(location, filename), relative_filename: filename, time: new Date().toISOString() });
  });
});
