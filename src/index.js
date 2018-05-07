import nexusdk from 'nexusdk';
import FileChangeListener from './FileChangeListener';

const listener = new FileChangeListener();

nexusdk.on('start', ({ path, recursive }) => {
  listener.setProperties({ path, recursive }, nexusdk.sendMessage);
  listener.start();
});

nexusdk.on('stop', () => {
  listener.stop();
});

nexusdk.on('exit', () => {
  listener.stop();
  process.exit(1);
});

