import Image from "next/image"
import Smile from "@/public/smile.svg"
import Heart from "@/public/heart.svg"
import LifeRing from "@/public/life_ring.svg"

export const HelpItems = () => {
    return (
        <div className="flex">
            <div className="flex flex-col w-[33.33%] gap-2">
                <h3 className="text-sensPurple mb-2">¿Necesitas ayuda?</h3>
                <div className="flex items-center gap-2">
                    <Image src={LifeRing} alt="img" />
                    <p className="w-[65%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali
                        qua. </p>
                </div>
            </div>
            <div className="flex flex-col w-[33.33%] gap-2">
                <h3 className="text-sensPurple mb-2">¿Por qué registrarse?</h3>
                <div className="flex items-center gap-2">
                    <Image src={Heart} alt="img" />
                    <p className="w-[65%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali
                        qua. </p>
                </div>
            </div>
            <div className="flex flex-col w-[33.33%] gap-2">
                <h3 className="text-sensPurple mb-2">Qué está pasando?</h3>
                <div className="flex items-center gap-2">
                    <Image src={Smile} alt="img" />
                    <p className="w-[65%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali
                        qua. </p>
                </div>
            </div>
        </div>
    )

}