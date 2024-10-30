import StatProgress from "./StatProgress";
import { GoBell } from "react-icons/go";
import { TbListSearch } from "react-icons/tb";
import { LiaPenNibSolid  } from "react-icons/lia";
import GlassCss from "./GlassCss";

export default function Stats() {
    const contentCredits =90;
    const researchCredits =12;
    const alertCredits =111;
    

    const card =[
        {
            icon: LiaPenNibSolid,
            title: "Total no. of content written",
            count: 1254,
        },
        {
            icon: TbListSearch,
            title: "Total no. of research generated",
            count: 452,
        } ,
        {
            icon: GoBell,
            title: "Total no. of alerts",
            count: 48,
        }
    ]
    return(
        <>
        <div className="grid grid-cols-1 gap-4  md:grid-cols-3 mt-[14px] px-[14px] py-[10px]">
            { card.map((el, i) => (
            
            <GlassCss key ={i}>
                <div className="flex flex-col gap-6 items-start justify-start p-6 rounded-[8px] h-[149px]">
                <div className="text-4xl  flex items-center justify-items-start gap-2">
                    <span className="bg-primary-green p-3 rounded-full text-black">
                    <el.icon size={18}/> 
                    </span>
                    <span>
                        <h2 className="text-sm font-medium text-gray-300">{el.title}</h2>
                    </span>
                </div>
        
                <div>
                    <p className="text-4xl font-semibold text-white">{el.count}</p>
                </div>
                </div>
            </GlassCss>
            ))}
        </div>
        <div className="flex mt-[14px] px-[14px] py-[10px]">
            <GlassCss>
            <div className="flex flex-col md:flex-row justify-between gap-10 w-full p-6 rounded-[8px]">
                    <div className="flex flex-col justify-end gap-4">
                        <div className="flex gap-6 justify-start">
                            <h2 className="text-lg font-medium text-gray-300 w-[12vw]">Total credit Credit usage</h2>
                            <p className="text-4xl font-semibold text-white">{card[0].count}</p>
                        </div>
                        <div className="flex gap-6 justify-start"><h2 className="text-lg font-medium text-gray-300 w-[10vw]">Credit balance</h2>
                        <p className="text-4xl font-semibold text-white">{90}</p>
                        </div>
                        <button className="bg-primary-green font-semibold text-black rounded-md w-[10vw] py-2">Top up</button>
                    </div>
                    <div className="flex gap-4">
                        <StatProgress title="Content" credits={contentCredits} number={20} />
                        <StatProgress title="Research" credits={researchCredits} number={10} />
                        <StatProgress title="Alert" credits={alertCredits} number={50} />
                    </div>
                </div>
            </GlassCss>
            </div>
            </>
    );
}
