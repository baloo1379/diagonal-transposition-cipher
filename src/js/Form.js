import Error from "./Error";

export default class Form {
    constructor(data) {
        this.errors = new Error();
        this.originalData = data;
        for (let field in data) {
            this[field] = data[field];
        }
    }
    data() {
        let data = {};
        for (let field in this.originalData) {
            data[field] = this[field];
        }
        return data;
    }
    reset() {
        this.errors.clear();
        for (let field in this.originalData) {
            this[field] = '';
        }
    }
    submit() {
        return new Promise((resolve, reject) => {

            let allErrors = {};
            let errorsPresent = false;
            for (let field in this.originalData) {
                if (this[field] === "") {
                    errorsPresent = true;
                    allErrors[field] = `${field} cannot be empty`;
                };
            }

            if (errorsPresent) {
                this.onFail(allErrors);
                reject(allErrors);
            }
            else {
                resolve(this.data());
                this.onSuccess();
            }
        });
    }
    onSuccess(data) {
        this.reset();
    }
    onFail(errors) {
        this.errors.record(errors);
    }
}