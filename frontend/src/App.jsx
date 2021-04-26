import { CoreProvider } from "@hackru/frontend-core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import RouteLinker from "./RouteLinker";
import React, { Component } from "react";

function App() {
    return (
        <BrowserRouter>
            <div>
                <NavBar />
                <Switch>
                    {RouteLinker.map((link) => {
                        return (
                            <Route exact path={link.path}>
                                <CoreProvider Store={link.store} Linker={link.linker}>
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
