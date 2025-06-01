import { PropsWithChildren } from "react";
import {trcp} from "../trpc/client";

export default function TrpcProvider({
  children,
}: PropsWithChildren){
    return(
        <trcp.Provider client>{client}  </trcp.Provider>
    )

}