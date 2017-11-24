import Request, { Geo } from '../src/request';


test('device serialization', () => {
  const req: Request = new Request();
  const devtimeValue = new Date().getMilliseconds();

  const geo = new Geo();

  req.device()
    .make('Xiaomi')
    .model('Mi 3')
    .ua('Mozilla/5.0 (Linux; Android 4.4.4; MI 3W Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.94 Mobile Safari/537.36')
    .w(1080)
    .h(1920)
    .pxratio(441)
    .mccmnc('310-005')
    .carrier('VERIZON')
    .connectiontype(2)
    .devtime(devtimeValue)
    .lmt(0)
    .ifa('my-adv-id')
    .os('Android')
    .osv('4.3')
    .geo(geo);

  expect(req.r.device.d.make).toEqual('Xiaomi');
  expect(req.r.device.d.model).toEqual('Mi 3');
  expect(req.r.device.d.ua).toEqual('Mozilla/5.0 (Linux; Android 4.4.4; MI 3W Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.94 Mobile Safari/537.36');
  expect(req.r.device.d.w).toEqual(1080);
  expect(req.r.device.d.h).toEqual(1920);
  expect(req.r.device.d.pxratio).toEqual(441);
  expect(req.r.device.d.mccmnc).toEqual('310-005');
  expect(req.r.device.d.carrier).toEqual('VERIZON');
  expect(req.r.device.d.connectiontype).toEqual(2);
  expect(req.r.device.d.devtime).toEqual(devtimeValue);
  expect(req.r.device.d.lmt).toEqual(0);
  expect(req.r.device.d.ifa).toEqual('my-adv-id');
  expect(req.r.device.d.os).toEqual('Android');
  expect(req.r.device.d.osv).toEqual('4.3');
  expect(req.r.device.d.geo).toEqual(geo);

  expect(req.r.device.serialize()).toEqual({
    make: 'Xiaomi',
    model: 'Mi 3',
    ua: 'Mozilla/5.0 (Linux; Android 4.4.4; MI 3W Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.94 Mobile Safari/537.36',
    w: 1080,
    h: 1920,
    pxratio: 441,
    mccmnc: '310-005',
    carrier: 'VERIZON',
    connectiontype: 2,
    devtime: devtimeValue,
    lmt: 0,
    ifa: 'my-adv-id',
    os: 'Android',
    osv: '4.3',
  });
});

test('device mccmnc empty line', () => {
  const req: Request = new Request();
  req.device()
    .mccmnc(' ');

  expect(req.r.d).not.toEqual(expect.objectContaining({ mccmnc: null }));
});

test('device carrier empty line', () => {
  const req: Request = new Request();
  req.device()
    .carrier(' ');

  expect(req.r.d).not.toEqual(expect.objectContaining({ carrier: null }));
});

test('device lmt not in range', () => {
  const req: Request = new Request();
  expect(() => req.device().lmt(2)).toThrow();
});
