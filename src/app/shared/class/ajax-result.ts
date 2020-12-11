export class AjaxResult {
    constructor(public success: boolean,
                public result: any,
                private error?: { message: string; details: string; },
                private targetUrl?: string,
                private unAuthorizedRequest?: boolean) {}
}
