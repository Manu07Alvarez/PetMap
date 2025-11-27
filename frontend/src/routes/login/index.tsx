import { component$ } from "@builder.io/qwik";
import Login from "~/components/login/login";
export {useLoginFormLoader} from "~/components/login/LoginFormLoader";
export {useLoggedInState} from "~/routes";
export default component$(() => {

    return (
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20 p-4">
            {/* Decorative background elements */}
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                <div class="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
            </div>
            
            {/* Login Card */}
            <div class="relative z-10 w-full flex justify-center">
                <Login/>
            </div>
        </div>
    );
});