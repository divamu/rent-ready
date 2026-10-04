import React from "react";

export function Icon({name, className="icon"}:{name:string,className?:string}) {
  if (name === "wrench") {
    return <svg viewBox="0 0 16 16" fill="currentColor" stroke="none" className={className} aria-hidden="true">
      <path d="M16 4.5a4.5 4.5 0 0 1-1.703 3.526L13 5l2.959-1.11q.04.3.041.61"/>
      <path d="M11.5 9c.653 0 1.273-.139 1.833-.39L12 5.5 11 3l3.826-1.53A4.5 4.5 0 0 0 7.29 6.092l-6.116 5.096a2.583 2.583 0 1 0 3.638 3.638L9.908 8.71A4.5 4.5 0 0 0 11.5 9m-1.292-4.361-.596.893.809-.27a.25.25 0 0 1 .287.377l-.596.893.809-.27.158.475-1.5.5a.25.25 0 0 1-.287-.376l.596-.893-.809.27a.25.25 0 0 1-.287-.377l.596-.893-.809.27-.158-.475 1.5-.5a.25.25 0 0 1 .287.376M3 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
    </svg>;
  }
  const common={viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round" as const,strokeLinejoin:"round" as const,className};
  const p:{[k:string]:React.ReactNode} = {
    home:<><path d="M3 11 12 3l9 8v9h-6v-6H9v6H3v-9Z"/></>,
    key:<><circle cx="7.5" cy="12.5" r="4.5"/><path d="M12 12.5h9M17 12.5v3M20 12.5v2"/></>,
    check:<><path d="m5 12 4 4L19 6"/></>,
    clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    clipboard:<><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M8 9h8M8 13h8M8 17h5"/></>,
    phone:<><path d="M6 3h4l1 5-3 2c1.5 3.3 3.7 5.5 7 7l2-3 5 1v4c0 1.1-.9 2-2 2C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h2Z"/></>,
    pin:<><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"/><circle cx="12" cy="10" r="2"/></>,
    user:<><circle cx="12" cy="8" r="4"/><path d="M4 21c.6-4.4 3.2-7 8-7s7.4 2.6 8 7"/></>,
    building:<><path d="M4 21V6l8-3v18M12 8h8v13M7 9h2M7 13h2M7 17h2M15 12h2M15 16h2M15 20h2"/></>,
    handshake:<><path d="M9 11 6.5 8.5a2 2 0 0 0-2.8 0L2 10.2l6.4 6.4a2.2 2.2 0 0 0 3.1 0l.7-.7"/><path d="M15 11l2.5-2.5a2 2 0 0 1 2.8 0l1.7 1.7-6.4 6.4a2.2 2.2 0 0 1-3.1 0L10 14"/><path d="m8.5 10.5 2.1-2.1a2.6 2.6 0 0 1 3.7 0l2.2 2.2a1.7 1.7 0 0 1-2.4 2.4L12.2 11"/></>,
    spark:<><path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z"/><path d="M19 14l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 14Z"/></>
  };
  return <svg {...common}>{p[name] || p.check}</svg>;
}