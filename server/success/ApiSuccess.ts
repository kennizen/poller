type HttpSuccessCodes = 200 | 201 | 202 | 203 | 204;

type ISuccessCodeToStatusMapping = {
  [key in HttpSuccessCodes]: string;
};

const SuccessCodeToStatusMap: ISuccessCodeToStatusMapping = {
  "200": "Ok",
  "201": "Created",
  "202": "Accepted",
  "203": "Partial Information",
  "204": "No Response",
};

export class DefaultAPISuccess<T> {
  statusCode: HttpSuccessCodes;
  status: string;
  message: string;
  data: T;

  constructor(statusCode: HttpSuccessCodes, message: string, data: T) {
    this.statusCode = statusCode;
    this.status = SuccessCodeToStatusMap[statusCode];
    this.message = message;
    this.data = data;
  }

  get [Symbol.toStringTag]() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
