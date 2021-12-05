interface optionsInterface {
  [key: string] : string;
}

class Loader {

    constructor(
      public baseLink : string,
      public options : object
      ) {}

    getResp(
        { endpoint, options = {} }: {endpoint: string, options?: object},
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options :optionsInterface, endpoint :string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res): string => res.json())
            .then((data) => callback(data))
            .catch((err): void => console.error(err));
    }
}

export default Loader;
