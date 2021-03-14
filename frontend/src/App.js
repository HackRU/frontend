import { CoreProvider } from "@hackru/frontend-core";
import LandingLinker from "./core/Landing/LandingLinker";
import LandingConfig from "./core/Landing/LandingConfig";
import { defaults, theme, navlinks } from "./Defaults";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <CoreProvider
                        Store={{
                            defaults,
                            theme,
                            navlinks,
                        }}
                        Linker={LandingLinker}
                    >
                        {LandingConfig}
                    </CoreProvider>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
