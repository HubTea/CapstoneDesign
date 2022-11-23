type ErrorCode = 
    'InvalidParameter' |
    'InvalidPassword' |
    'Unauthorized' |
    'AlreadyExist' |
    'NotFound';

export class HttpError extends Error {
    constructor(
        public baseError: any,
        public statusCode: number,
        public code: ErrorCode, 
        public description: string
    ) {
        super();
    }
}

export class InvalidParameter extends HttpError {
    constructor(baseError: any, ...parameterNameList: string[]) {
        super(baseError, 400, 'InvalidParameter', parameterNameList.toString());
    }
}

export class Unauthorized extends HttpError {
    constructor(baseError: any) {
        super(baseError, 401, 'Unauthorized', '');
    }
}

export class AlreadyExist extends HttpError {
    constructor(baseError: any) {
        super(baseError, 400, 'AlreadyExist', '');
    }
}

export class NotFound extends HttpError {
    constructor(baseError: any) {
        super(baseError, 404, 'NotFound', '');
    }
}