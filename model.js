import Events from "./events.js";

class Model {
    get_store(api, app) {
        let redirect = api.$get_url_prop("redirect");

        let _store = Framework7.createStore({
            state: {},
            getters: {},
            actions: {
                // ON_AUTH
                async on_auth({ state }, params) {
                    console.log(`Username:${params.username}`);
                    let res = await api.$post("/authorize", { username: params.username, password: params.password, redirect: redirect });
                    if (res && res.status === "ok") {
                        window.location.assign(res.url);
                    } else {
                        // console.log(res);
                        // Raise event
                        Events.fire("SIGNIN_ERROR", res)
                    }
                },

                // ON_SIGNUP
                async on_signup({ state }, params) {
                    console.log("Register")

                    let res = await api.$post("/register", { username: params.username, password: params.password });

                    app.f7.views.main.router.navigate('/');
                },
            },
        });

        return _store;
    }
}

export default new Model();