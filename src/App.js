import { CoreProvider } from "@hackru/frontend-core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RouteLinker from "./RouteLinker";
import React from "react";
function App() {
    return (
        <BrowserRouter style={{ width: "100%" }}>
            <div>
                <Switch>
                    {RouteLinker.map((link) => {
                        return (
                            <Route exact path={link.path}>
                                <CoreProvider
                                    Store={link.store}
                                    Linker={link.linker}
                                >
                                    {link.config}
                                </CoreProvider>
                            </Route>
                        );
                    })}
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
