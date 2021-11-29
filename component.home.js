/**
 *
 */

var $$ = Dom7;

import Events from "./events.js";

let initialised = false;

export default (props, { $, $f7, $h, $store, $f7router }) => {

    // Register Events handlers ONLY ONCE
    if(!initialised){
        console.log("Init")

        Events.on("SIGNIN_ERROR", (data) => {
            console.log("")
            // Toast if app exists, will not allow creation of duplicate
            $f7.toast.create({
                text: `Incorrect 'username' or 'password'`,
                closeTimeout: 2000,
                position: 'top',
            }).open()
            // if (data.exists) {
            
            // }
        })

        initialised = true;
    }

    var hash = async(message) => {
        let output = Array.prototype.map
            .call(
                new Uint8Array(
                    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(message))
                ),
                (x) => ("0" + x.toString(16)).slice(-2)
            )
            .join("");
        return output
    }


    // digest({ message: "hello" }).then(console.log)

    const on_signin = async(evt, data) => {
        let signin_name = $$(".signin-form .signin_name")[0].value;
        let signin_pass = $$(".signin-form .signin_pass")[0].value;
        // let signin_name = $("#username")[0].value;
        // let password = $("#password")[0].value;
        // Hash the input 
        let encrypted = await hash(signin_pass);
        // Send hashed password over the wire
        $store.dispatch('on_auth', { username: signin_name, password: encrypted })
    }

    const on_signup = (evt, data) => {
        console.log("signup")
            // Navigate back to home
        $f7router.navigate('/signup');
    }

    return () => $h `
    <div class="page no-toolbar no-navbar no-swipeback login-screen-page">
        <!-- Scrollable page content -->
        <div class="page-content login-screen-content">
            <div class="login-screen-title">Vee3</div>
            <form class="signin-form">
                <div class="list">
                    <ul>
                        <li class="item-content item-input">
                            <div class="item-inner">
                                <div class="item-title item-label">Username</div>
                                <div class="item-input-wrap">
                                    <input type="text" placeholder="Your username" class="signin_name" />
                                    <span class="input-clear-button"></span>
                                </div>
                            </div>
                        </li>
                        <li class="item-content item-input">
                            <div class="item-inner">
                                <div class="item-title item-label">Password</div>
                                <div class="item-input-wrap">
                                    <input type="password" placeholder="Your password" class="signin_pass" />
                                    <span class="input-clear-button"></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="list">
                    <ul>
                        <li>
                            <a href="#" @click=${(evt) => on_signin(evt)} class="list-button">Sign In</a>
                        </li>
                        <li>
                            <a href="#" @click=${(evt) => on_signup(evt)} class="list-button">Sign Up</a>
                        </li>
                    </ul>
                    <div class="block-footer">
                        Vee3 keeps your user data as safe as possible
                    </div>
                </div>
            </form>
        </div>
    </div>
`;
};