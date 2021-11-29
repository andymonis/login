/**
 *
 */

var $$ = Dom7;

import Events from "./events.js";

export default (props, { $, $h, $store, $f7router }) => {

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

    const on_cancel = (evt, data) => {
        // Navigate back to home
        $f7router.navigate('/');
    }

    const on_register = async(evt, data) => {
        // let username = $("#username")[0].value;
        let signup_name = $$(".signup-form input")[0].value;
        let signup_pass = $$(".signup-form .signup_pass")[0].value;
        let encrypted = await hash(signup_pass);

        $store.dispatch('on_signup', { username: signup_name, password: encrypted })
    }

    return () => $h `
        <div class="page no-toolbar no-navbar no-swipeback login-screen-page">
            <!-- Scrollable page content -->
            <div class="page-content login-screen-content">
                <div class="login-screen-title">Vee3 Sign Up</div>
                <form class="signup-form">
                    <div class="list">
                        <ul>
                            <li class="item-content item-input">
                                <div class="item-inner">
                                    <div class="item-title item-label">email</div>
                                    <div class="item-input-wrap">
                                        <input type="text" placeholder="email address" class="signup_name" />
                                        <span class="input-clear-button"></span>
                                    </div>
                                </div>
                            </li>
                            <li class="item-content item-input">
                                <div class="item-inner">
                                    <div class="item-title item-label">Password</div>
                                    <div class="item-input-wrap">
                                        <input type="password" placeholder="Your password" class="signup_pass" />
                                        <span class="input-clear-button"></span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="list">
                        <ul>
                            <li>
                                <a href="#" @click=${(evt) => on_register(evt)} class="list-button">Register</a>
                            </li>
                            <li>
                                <a href="#" @click=${(evt) => on_cancel(evt)} class="list-button">Back to Signin</a>
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