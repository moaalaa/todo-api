const api = {
    /**
     * 
     * @param {mixed} data Data That Will Send by The Response
     * @param {mixed} error error message/s for response
     * @param {number} code  status code that response will have it
     */
    api(data, error = null, code = 200) {
        
        if (error) return this.error(error, code);

        this.data = data;
        this.error = error;
        this.code = code;

        return this;
    },
    /**
     * 
     * @param {Object} response Express Response Object  
     */
    response(response) {
        return response.status(this.code).send({
            data: this.data,
            messages: this.error,
            code: this.code,
        })
    },
    /**
     * 
     * @param {Object} response Express Response Object  
     */
    res(response) {
        return this.response(response)
    },
    /**
     * @param {mixed} error error message/s for response
     * @param {number} code  status code that response will have it
     */
    error(error, code = 500) {
        this.data = [];
        this.code = code;
        let errorsMsg;

        if (error.hasOwnProperty('message')) {
            errorsMsg = error.message;
        } else {
            errorsMsg = error.toString();
        }

        this.error = errorsMsg;
        
        return this;
    }

}

module.exports = api;