import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'ecaba7c4a29a48b9bbddcadb0a1061f6', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
