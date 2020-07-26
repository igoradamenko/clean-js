import offices from './data/offices';

export default (method, url, data, headers, params) => {
  const lastId = offices[params.id][offices[params.id].length - 1].id;

  const body = JSON.parse(data);

  offices[params.id].push({
    id: (+lastId + 1).toString(),
    address: body.address,
    coords: body.coords,
    index: Math.floor(Math.random() * 100),
  });

  return [200, {
    result: {
      status: 'ok',
    },
  }];
};
