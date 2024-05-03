import React from "react";
import { Icon } from "@iconify/react";
import { numberWithCommas } from "../../helper/help";

interface IMinerStatsCardProps {
    heading: string;
    icon: string;
    subHeadings: {
        name: string;
        value: string;
    }[];
    containerClass?: string;
}

const MinerStatsCard = ({ heading, icon, subHeadings, containerClass }: IMinerStatsCardProps) => {
    return (
        <section className={`${containerClass}`}>
            <h3 className="primary capitalize mb-3 px-1">{heading}</h3>
            <div className="relative lg:text-sm text-xs h-[112px] lg:w-[400px] max-w-[400px] text-black">
                <div className="bg-[#86CEE4] p-3 h-[30px] rounded-t-xl flex items-center w-full">
                    <span className="mr-1">{subHeadings[0].name}:</span>
                    <span>
                        {subHeadings[0].value && numberWithCommas(subHeadings[0].value)}
                    </span>
                </div>
                <div className="bg-[#519CAD] p-3 h-[30px] flex items-center w-full">
                    <span className="mr-1">{subHeadings[1].name}:</span>
                    <span>
                        {subHeadings[1].value && numberWithCommas(subHeadings[1].value)}
                    </span>
                </div>
                <div className="bg-[#AEE7F4] p-3 h-[30px] flex items-center w-full">
                    <span className="mr-1">{subHeadings[2].name}:</span>
                    <span>
                        {subHeadings[2].value && numberWithCommas(subHeadings[2].value)}
                    </span>
                </div>
                <div className="bg-[#519CAD] p-3 h-[30px] rounded-b-xl flex items-center w-full">
                    <span className="mr-1">{subHeadings[3].name}:</span>
                    <span>
                        {subHeadings[3].value && numberWithCommas(subHeadings[3].value)}
                    </span>
                </div>
                <div className="absolute top-[-11px] -right-8">
                    <section className="relative">
                        <img src="/assets/vectorArts/circle.svg" alt="circle-vector" className="w-[145px] h-[145px]"/>
                        <div className="absolute top-[12px] right-[9px] bg-black rounded-full w-[120px] h-[120px] flex items-center justify-center">
                            <Icon className={`primary absolute text-[50px]`} icon={icon} />
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default MinerStatsCard;
