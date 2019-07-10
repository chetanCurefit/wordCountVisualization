export class ApiUtils {

    public static makeGetRequest(url:string): Promise<Response> {
        return fetch(url);
    }


}