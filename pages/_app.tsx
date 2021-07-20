import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Amplify,{Hub} from "aws-amplify";
import awsmobile from "../src/aws-exports";
import  Router  from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

console.error = () => {};
Hub.listen("auth", (data) => {
  if (data.payload.event === "signOut") {
    Router.push("/login");
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  Amplify.configure(awsmobile);
  return <Component {...pageProps} />
}
export default MyApp
