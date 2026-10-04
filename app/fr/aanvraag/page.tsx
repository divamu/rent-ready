import type { Metadata } from "next";
import RequestPage from "../../../components/RequestPage";
export const metadata:Metadata={title:"Demander un service | Rent Ready",robots:{index:true,follow:true}};
export default function Page(){return <RequestPage lang="fr"/>}
