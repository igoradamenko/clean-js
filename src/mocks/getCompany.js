import offices from './data/offices';

export default (method, url, data, headers, params) => [200, {
  result: {
    status: 'ok',
    offices: offices[params.id],
  },
}];
