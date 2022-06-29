import type { NextPage } from "next";
import { useState, useEffect } from "react"
import { useAccount } from "wagmi";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import { MotionFadeIn } from "@/components/motion"

const PreCombatPage: NextPage = () => {
  const [nfts, setNfts] = useState<any>();
  const [selectedNft, setSelectedNft] = useState<any>();
  const [isHolder, setIsHolder] = useState<boolean>(false);
  const { data: signerData } = useAccount();
  const getOwnerNfts = async () => {
    const web3 = createAlchemyWeb3(
      "https://eth-mainnet.alchemyapi.io/nft/v2/demo",
    );

    if (signerData?.address) {
      const fetchedNfts = await web3.alchemy.getNfts({ owner: "0x816a7dccddb35f12207307d26424d31d2b674dff", contractAddresses: ["0x25ed58c027921E14D86380eA2646E3a1B5C55A8b"] })
      if (fetchedNfts.ownedNfts.length) {
        setIsHolder(true)
        setNfts(fetchedNfts.ownedNfts)
      }
      else {
        alert("ERROR: NO NFTS ARE HERE MATE")
      }
    }
  }
  useEffect(() => {
    getOwnerNfts();
  }, [])

  if (selectedNft) console.log(selectedNft)

  return (
    <div className="text-white">
      <h1 className="text-center p-4 text-2xl">{isHolder ? "Choose your fighter" : ""}</h1 >
      <MotionFadeIn>
        {isHolder && selectedNft === undefined &&
          (<div className="flex">
            <div className="max-h-[420px] overflow-scroll p-4 border-neutral-700 justify-center border-b-2">
              <div className="justify-center grid grid-rows-4 grid-flow-col gap-8">
                {nfts && nfts.map((nft: any, i: number) => {
                  const { description, image, name } = nft?.metadata;
                  return (
                    <div className="max-w-[360px] py-0 drop-shadow-[0 35px 35px #fff]">
                      <h1>{name}</h1>
                      <div className="relative">
                        <img src={image} width='360' height='360' className="rounded-lg" />
                        <input name={`image_${i}`} className="rounded-sm absolute accent-lime-400 bottom-2 right-2 absolute" type="checkbox" onChange={() => { setSelectedNft(nft), console.log(selectedNft) }} />
                      </div>
                      <p>{description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          )}
        {isHolder && selectedNft && (
          <div className="justify-center py-0">
            <h1>{selectedNft.metadata.name}</h1>
            <div className="relative">
              <img src={selectedNft.metadata.image} width='520' height='520' className="rounded-lg" />
            </div>
            <input className="rounded-sm absolute accent-lime-400 bottom-2 right-2 absolute" type="checkbox" onChange={() => setSelectedNft(undefined)} />
            <p>{selectedNft.metadata.description}</p>
          </div>
        )}
      </MotionFadeIn>
    </div>
  );
};

export default PreCombatPage;
