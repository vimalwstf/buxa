import { GoBell } from "react-icons/go";
import { TbListSearch } from "react-icons/tb";
import { LiaPenNibSolid  } from "react-icons/lia";

export default function DashboardStats() {
    const number =50;

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
        <div className="grid grid-cols-1 gap-4  md:grid-cols-3 mt-[14px] px-[14px] py-[10px]">
            { card.map((el, i) => (
           <div
            key ={i}
            className={`flex flex-col gap-6 items-start justify-start p-6 rounded-[8px] h-[159px] `}
            >
           <div className="text-4xl  flex items-center justify-items-start gap-2">
             <span className="bg-primary-green p-3 rounded-full text-black">
               <el.icon size={18}/> 
             </span>
             <span>
               <h2 className="text-lg font-medium text-gray-300">{el.title}</h2>
             </span>
           </div>
   
           <div>
             <p className="text-4xl font-semibold text-white">{el.count}</p>
           </div>
         </div>
            ))}

            
        </div>
    );
}