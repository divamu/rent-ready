import type { Metadata } from "next";
import RequestPage from "../../../components/RequestPage";
export const metadata:Metadata={title:"Send a request | Rent Ready",robots:{index:true,follow:true}};
export default function Page(){return <RequestPage lang="en"/>}
