import { useState } from "react";

import GaraSearchInput from "../gara-search-input";

function GaraSearch() {
    // TODO: Implement Overlay and SearchResult
    const [hasFocused, setFocused] = useState<boolean>(false);

    const onFocused = () => {
        setFocused(true);
    };

    const onBlurred = () => {
        setFocused(false);
    };

    return (
        <div
            tabIndex={-1}
            className="w-full relative"
            onFocus={onFocused}
            onBlur={onBlurred}
        >
            <GaraSearchInput hasFocused={hasFocused} />
        </div>
    );
}

export default GaraSearch;
