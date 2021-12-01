import Utils from "./utils.js";

let Model = {
    api: undefined,
    view: ko.observable("signin"),

    signin: {
        username: ko.observable(""),
        password: ko.observable(""),
        error: ko.observable(false)
    },

    signup: {
        username: ko.observable(""),
        password: ko.observable(""),
        error: ko.observable(false),
        error_msg: ko.observable("")
    },

    // Methods
    signin_click_signup: function(){
        this.route("signup");
    },
    signin_click_auth: async function(){
        this.signin.error(false);

        let username = this.signin.username();
        let password = this.signin.password();

        let encrypted = await Utils.hash(password);
        let res = await this.api.$post("/authorize", { username:username, password:encrypted });

        console.log(res)
        if (res && res.status === "ok") {
            window.location.assign(res.url);
        } else {
            // Raise error
            this.signin.error(true);
        }
    },
    signup_click_cancel: function(){
        this.route("signin");
    },
    signup_click_register: async function(){
        this.signin.error(false);

        let username = this.signup.username();
        let password = this.signup.password();

        let encrypted = await Utils.hash(password);
        let res = await this.api.$post("/register", { username:username, password:encrypted });

        console.log(res)
        if (res && res.status === "ok") {
            this.route("signin");
        } else {
            // Raise error
            this.signup.error(true);
            this.signup.error_msg(res.message)
        }
    },
    route: function(path){
        this.view(path);
    }
}

export default Model;