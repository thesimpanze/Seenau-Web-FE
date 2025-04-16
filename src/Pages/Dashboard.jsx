import BigPrimaryButton from "../components/BigPrimaryButton";
import Navbar from "../components/Navbar";



const Dashboard = () => {
    return (
        <div className="">
            <Navbar />
            <section className="flex justify-around py-7 px-7">
                <div className="flex gap-4">
                    <div className="w-28 h-28 rounded-full bg-red-100 ">
                        
                    </div>
                    <div className="flex flex-col justify-center ">
                        <span className="font-bold mb-1.5 text-xl">Rasyid Nuruddin</span>
                        <span className="">Rasyid8nuruddin@gmail.com</span>
                        <span className="font-semibold">Focus Master</span>
                    </div>
                </div>
                    <div className="flex items-center">
                        <BigPrimaryButton>Edit Profile</BigPrimaryButton>
                    </div>
            </section>
            <section className="flex items-center justify-center gap-10  mt-10">
                <div className="flex flex-col w-[20%] text-xl py-7 items-center shadow-md outline outline-gray-50 ">
                    <span className="font-bold">5h 15m</span>
                    <span>Focus time</span>
                </div>
                <div className="flex flex-col w-[20%] text-xl py-7 items-center shadow-md outline outline-gray-50 ">
                    <span className="font-bold">10</span>
                    <span>Task Complete</span>
                </div>
                <div className="flex flex-col w-[20%] text-xl py-7 items-center shadow-md outline outline-gray-50 ">
                    <span className="font-bold">Populer</span>
                    <span>Preferred Focus Level</span>
                </div>
            </section>
        </div>
    )
}
export default Dashboard;