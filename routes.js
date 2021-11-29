import HomePage from './component.home.js';
import SignUpPage from './component.signup.js';

let routes = [{
        path: "/",
        component: HomePage,
        options: {
            transition: "f7-push",
        },
    },
    {
        path: "/signup",
        component: SignUpPage,
        options: {
            transition: "f7-push",
        },
    },
];

export default routes;