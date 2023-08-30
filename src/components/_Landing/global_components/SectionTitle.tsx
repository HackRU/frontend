import React from "react";

function SectionTitle(props: { title: string }) {
    const { title } = props;
    return (
        <div className="flex w-full px-4 justify-center items-center my-10 z-50">
            <div className="w-1/6 h-2 bg-text mr-4" />
            <div className="HeaderText font-semibold text-7xl text-text">{title}</div>
            <div className="w-1/6 h-2 bg-text ml-4" />
        </div>
    );
}

export default SectionTitle;