import Request from '../src/Request';


test('test request', () => {
  const req: Request = new Request();
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
    .devtime(new Date().getMilliseconds())
    .lmt(0)
    .ifa('my-adv-id')
    .os('Android')
    .osv('4.3');
});
