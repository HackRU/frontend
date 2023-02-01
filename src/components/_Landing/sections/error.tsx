import React from "react";

/**
 * Error Section page with custom error title and message.
 * @param props
 * @returns
 */
function Error(props: { title: string, message: string }) {
    const { title, message } = props;
    return (
        <div className="w-full h-full flex justify-center items-center bg-gray-300">
            <div className="font-bold text-2xl text-red-400 text-center max-w-lg">
                <p className="text-red-700">
                    {title}
                </p>
                <p>
                    {message}
                </p>
            </div>
        </div>
    );
}

export default Error;