import Request from '../request';

export default class Adapter {
  type: String;
  factory: (req: Request, callback: () => mixed) => mixed;

  constructor(type: String, factory?: (req: Request) => mixed) {
    this.type = type;
    this.factory = factory;
  }

  request(buildRequestTimeout: number) {
    const req: Request = new Request();
    let promise: Promise<Request>;

    if (typeof this.factory !== 'undefined') {
      promise = new Promise((resolve, reject) => {
        this.factory.call(this, req, resolve.bind(req, req));
        const rejectCallback = reject.bind(
          'request build timeout',
          'request build timeout',
        );
        setInterval(rejectCallback, buildRequestTimeout);
      }).catch((error) => {
        throw Error(error.message);
      });
    } else {
      promise = new Promise((resolve) => {
        resolve(req);
      });
    }

    return promise;
  }

  response(response) {
    throw new Error('You should extend Adapter ' +
      'and implement this method in subclass!');
  }
}
