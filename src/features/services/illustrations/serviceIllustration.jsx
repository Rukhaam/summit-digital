import { useId } from "react";
import styles from "./serviceIllustration.module.css";

function Notebook({ metal }) {
  return <>
    <rect x="25" y="9" width="150" height="91" rx="7" fill={metal} />
    <rect x="29" y="13" width="142" height="83" rx="4" fill="#161921" />
    <path d="M90 13h20v3q0 2-2 2H92q-2 0-2-2z" fill="#070809" stroke="none" />
    <rect x="38" y="25" width="124" height="62" rx="4" fill="#292b39" stroke="none" />
    <path d="M39 35h122M99 36v49" stroke="#545766" strokeWidth="1" />
    {[44,49,54].map((x,i)=><circle key={x} cx={x} cy="30" r="1.4" fill={["#ff926f","#ffda68","#b9e2ab"][i]} stroke="none" />)}
    <g strokeWidth="3" className={styles.code}>
      <path d="M46 46h19m-14 8h27m-27 8h19" stroke="#c6b1ff" />
      <path d="M56 70h25m-35 8h12" stroke="#adeda5" />
    </g>
    <rect x="106" y="42" width="48" height="37" rx="2" fill="#f1ecdd" stroke="none" />
    <path d="M112 50h18m-18 5h11" stroke="#272636" strokeWidth="3" />
    <circle cx="140" cy="63" r="10" fill="#f89c75" stroke="none" />
    <path d="M112 71l13-14 13 14z" fill="#8168cf" stroke="none" />
    <path d="M25 100h150l17 8q2 4-7 5H15q-9-1-7-5z" fill={metal} />
    <path d="M9 108h182M86 101h28l-3 3H89z" stroke="#767981" strokeWidth="1.2" />
  </>;
}

const objects = {
  "brand-identity": <><path d="M42 87L78 25l37 62z" fill="#ab99e7"/><path d="M77 87l26-46 27 46z" fill="#ffe878"/><g className={styles.detail}><path d="M114 23l39 16-9 40-33 19 1-37z" fill="#faf6e9"/><path d="M112 96l17-35"/><circle cx="131" cy="57" r="4" fill="#272631"/></g></>,
  "social-video": <><rect x="37" y="37" width="126" height="63" rx="6" fill="#aa9fe5"/><g className={styles.detail}><path d="M36 26l122-15 3 18L39 44z" fill="#faf5df"/><path d="M56 24l-8 16m34-20l-9 16m34-19l-9 16m34-19l-9 17" strokeWidth="6"/></g><path d="M89 52l27 16-27 16z" fill="#ffe76e"/></>,
  "digital-strategy": <><rect x="32" y="25" width="112" height="73" rx="6" fill="#faf3de"/><path d="M47 81V44m0 37h79" stroke="#9c91b2"/><path d="M54 74l22-18 15 6 29-25" fill="none" stroke="#6753bb" strokeWidth="5"/><g className={styles.detail}><circle cx="129" cy="57" r="22" fill="#bcdef1" fillOpacity=".75"/><path d="M145 74l18 20" strokeWidth="9"/></g></>,
  "brand-launches": <><path d="M56 93l16-26 14 11-30 15z" fill="#ffcc43"/><g className={styles.detail}><path d="M71 65l5-23 27-1m3 37-2 18-24 5 4-24" fill="#ab9de6"/><path d="M71 65q22-42 73-46-6 49-53 65z" fill="#faf3de"/><circle cx="114" cy="48" r="9" fill="#abcfed"/></g></>,
  maintenance: <><rect x="33" y="24" width="115" height="72" rx="6" fill="#faf5e8"/><path d="M34 39h112"/><circle cx="43" cy="32" r="2" fill="#8678bb"/><path d="M45 69h18l7-15 10 27 8-13h20" fill="none" stroke="#7462aa" strokeWidth="4"/><g className={styles.detail}><path d="M132 49l22 8v16q0 18-22 29-23-11-23-29V57z" fill="#abd9a6"/><path d="M121 74l8 8 15-17" fill="none" strokeWidth="4"/></g></>,
};

export default function ServiceIllustration({ service }) {
  const id = useId();
  return <svg className={styles.illustration} viewBox="0 0 200 124" aria-hidden="true" focusable="false" stroke="#25252c" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
    <defs><linearGradient id={id} x2=".85" y2="1"><stop stopColor="#fcfaf3"/><stop offset=".48" stopColor="#c9ccd4"/><stop offset="1" stopColor="#92959f"/></linearGradient></defs>
    {service === "web-development" ? <Notebook metal={`url(#${id})`} /> : objects[service]}
  </svg>;
}
