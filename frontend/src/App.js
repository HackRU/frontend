import { CoreProvider } from "@hackru/frontend-core";
import { Test } from "./testModule";
import Linker from "./core/Linker";
import Config from "./core/Config";
import {defaults, theme, navLinks} from "./Defaults";
function App() {
    let i = 0;
    return (
        <CoreProvider Store={{
            defaults,
            theme,
            navLinks
        }} Linker={Linker}>
            {Config}
        </CoreProvider>
    );
}

export default App;
