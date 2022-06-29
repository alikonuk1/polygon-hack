import type { NextPage } from "next";
import { useContractRead, useAccount } from "wagmi";
import { useState, useEffect } from 'react';
import GenesisContract from "../../../backend/abis/GenesisContract.json";

import { MintButton } from "@/components/elements";
import { Carousel, warriorSelect } from "@/components/sections/mint"

const PreCombatPage: NextPage = () => {
  const { data: signerData } = useAccount();
  const [ownsNFT, setOwnsNFT] = useState<boolean>(false);
  const [error, setError] = useState({ show: false, title: "", message: "" });

  const handleSelect = () => {
    debugger
    console.log(signerData?.address)
  }

  const { data, isError, isLoading } = useContractRead(
    {
      addressOrName: "0x25ed58c027921e14d86380ea2646e3a1b5c55a8b",
      contractInterface: GenesisContract.abi,
    },
    "balanceOf",
    {
      enabled: !!signerData?.address,
      args: signerData?.address,
      onSuccess(data) {
        if (parseInt(data._hex) > 0) setOwnsNFT(true);
        else {
          setOwnsNFT(false);
          setError({
            show: true,
            title: "BATTLE NFT NOT FOUND",
            message: "We couldn't find the NFT needed to play. Please check the marketplace.",
          });
        }
      },
      onError(error) {
        setOwnsNFT(false);
        setError({
          show: true,
          title: "SOMETHING WENT WRONG",
          message: error.toString(),
        });
      },
    }
  );

  return (
    <div className="text-white">
      <div className="flex justify-center">
        <MintButton onClick={() => handleSelect()}>FIGHT</MintButton>
      </div>
      <div className="mb-4 flex flex-row justify-center mt-8 p-4">
        <Carousel section={warriorSelect} />
      </div>
    </div>
  );
};

export default PreCombatPage;