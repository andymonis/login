import Model from "./model.js";

/**
 * Framework7 Demonstration
 */
export default class Main {
    /**
     * 
     * @param {*} config 
     */
    constructor(config) {
        Model.api = config.api;
    }
    /**
     * Main start point for the app
     * @param {*} params
     */
    async init(params) {
        console.log("Hello knockout");

        ko.applyBindings(Model);
    }
}