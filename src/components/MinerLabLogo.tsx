import React from 'react'

interface MinerLabLogoProps {
    size?: string
}

const MinerLabLogo = ({size = "392px"}: MinerLabLogoProps) => {
    return (
        <div className={`flex flex-col mx-auto max-w-[260px]`}>
            <span className="text-[16px]">Powered by</span>
            <span className="primary text-right text-[26px]">
                Minerlab.io
            </span>
            <img className={`w-[${size} h-${size}] object-contain`} src="/assets/logo_only.png" alt="minerlab-logo" />
        </div>
    )
}

export default MinerLabLogo