import { syncToServer } from './functions';
import SInfo from 'react-native-sensitive-info';

test('push to server', () => {
  expect(syncToServer('push')).toBe(obj);
});
