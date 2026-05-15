"use client";
import { useState } from "react";
import { useUser } from "./context";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Users } from "./column";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import MergeDisplay from "./merge";

type SecondUserDetails = {
  key: string;
  value: string | number;
};

export default function Merge() {
  const { selectedUsers, setSelectedUsers,userdata } = useUser();
  let firstUser = selectedUsers[0];
  let secondUser = selectedUsers[1];

  const secondUserDetails: SecondUserDetails[] = [
    {
      key: "name",
      value: secondUser?.name,
    },
    {
      key: "email",
      value: secondUser?.email,
    },
    {
      key: "gender",
      value: secondUser?.gender,
    },
    {
      key: "phone",
      value: secondUser?.phone,
    },
    {
      key: "dateRegistered",
      value: secondUser?.dateRegistered,
    },
    {
      key: "country",
      value:secondUser?.country
    }
  ];

    const [selectValue, setSelectedValue] = useState<Record<string, boolean>>({});
    const [search, setSearch] = useState<string>("")
    const [secondSearch,setSecondSearch] = useState<string>("")
    const filteredUsers = userdata.filter((user)=>user.name.toLowerCase().includes(search.toLowerCase()))
  const [mergeValues, setMergeValues] = useState<Users>({
    name: firstUser?.name,
    email: firstUser?.email,
    gender: firstUser?.gender,
    phone: firstUser?.phone,
    dateRegistered: firstUser?.dateRegistered,
    country: firstUser?.country,
    id:firstUser?.id
  });
  const [showMerge,setShowMerge] = useState(false)
    const updatePrimaryUser = (user: Users) => {
        setSelectedUsers((prev) => [
            user,prev[1]
        ])
        setSearch('')
    }
    const updateSecondaryUser = (user: Users) => {
        setSelectedUsers((prev) => [
            prev[0],user
        ])
        setSecondSearch('')
    }
  const swapEntity = () => {
    setSelectedUsers((prev) => [prev[1], prev[0]]);
  };
 
    
    return (
      <div className="px-10 py-3 font-inter overflow-y-auto">
        <div className={`${showMerge ? 'hidden':'block'}`}>
        <div className={`flex flex-col lg:flex-row justify-between gap-4 lg:gap-2 items-start w-full`}>
          <div>
                <div className="relative">
                    <div className="flex flex-col gap-1">
                        <Label  className="text-xl font-semibold">Primary User</Label>
                        <Input value={search} onChange={(e) => setSearch(e.target.value)} className=" w-73! outline-none! bg-white! placeholder:font-medium! placeholder:text-gray-400!" placeholder="Search and select primary user..."/>
                        </div>
                    {search && filteredUsers.length > 0 && (
                        <div className="flex flex-col gap-0.5 absolute h-12 overflow-y-auto bg-white z-5 w-73  no-scrollbar border border-gray-300 rounded-md shadow-md px-2">
                            {filteredUsers.map((u, index) => (
                                <div key={index}  onClick={()=>updatePrimaryUser(u)}>
                                    <p className="text-base">{u.name}</p>
                                </div>
                        ))}
                        </div>
                    )}
            </div>
              <div className="bg-blue-50 border border-blue-400 rounded-md flex flex-col gap-2 mt-8 text-base p-4 w-full">
              <h2 className="flex flex-col gap-1">
                <span className="text-gray-500">Name</span>
               <span>{firstUser?.name}</span> 
              </h2>
              <p className="flex flex-col gap-1">
                <span className="text-gray-500">Email</span>
               <span>{firstUser?.email}</span> 
              </p>
              <p className="flex flex-col gap-1">
                <span className="text-gray-500">Gender</span>
              <span>{firstUser?.gender}</span>  
              </p>
              <p className="flex flex-col gap-1">
                <span className="text-gray-500">Phone</span>
                <span>{firstUser?.phone}</span>
              </p>
              <p className="flex flex-col gap-1">
                <span className="text-gray-500">DateRegistered</span>
               <span> {firstUser?.dateRegistered}</span>
              </p>
              <p className="flex flex-col gap-1">
              <span className="text-gray-500">Country</span>
              <span>{ firstUser?.country}</span>
            </p>
      </div>
          </div>
          <div className="lg:pt-10">
            <img src="/icons8-back-and-forth-50.png" alt="" onClick={swapEntity} className="w-4 h-4 cursor-pointer" />
          </div>
          <div>
                <div className="relative">
                    <div className="flex flex-col gap-1">
                        <Label className="text-xl font-semibold">Secondary User</Label>
                        <Input value={secondSearch} onChange={(e) => setSecondSearch(e.target.value)} className=" w-73! outline-none bg-white! placeholder:font-medium placeholder:text-gray-400 " placeholder="Search and select secondary user..."/>
                        </div>
                    {secondSearch && filteredUsers.length > 0 && (
                        <div className="flex flex-col gap-0.5 absolute h-12 overflow-y-auto bg-white z-5 w-73 no-scrollbar border border-gray-300 rounded-md shadow-md px-2">
                            {filteredUsers.map((u, index) => (
                                <div key={index}  onClick={()=>updateSecondaryUser(u)}>
                                    <p className="text-base">{u.name}</p>
                                </div>
                        ))}
                        </div>
                    )}
            </div>
            <div className="bg-white border border-gray-300 rounded-md flex flex-col gap-2 mt-8 text-base p-4 w-full">
        {secondUserDetails.map((s) => (
          <div key={s.key} className="flex flex-col gap-1 ">
            <h2 className="text-gray-500">{ s.key.charAt(0).toUpperCase() + s.key.slice(1) }</h2>
            <div className="text-base flex items-center gap-2">
              <Checkbox
                className=""
              checked={selectValue[s.key] || false}
              onCheckedChange={(checked) => {
                setSelectedValue((prev) => ({
                  ...prev,
                  [s.key]: !!checked,
                }));
                if (checked) {
                  setMergeValues((prev) => ({
                    ...prev,

                    [s.key]: checked
                      ? s.value
                      : firstUser?.[s.key as keyof typeof firstUser],
                  }));
                  }
                else {
                    setMergeValues({
    name: firstUser?.name,
    email: firstUser?.email,
    gender: firstUser?.gender,
    phone: firstUser?.phone,
    dateRegistered: firstUser?.dateRegistered,
                      id: firstUser?.id,
    country:firstUser?.country
  })
                  }
              }}
            />
              <span>{s.value}</span>
            </div>
          </div>
        ))}
            </div>
            
          </div>
            <div className="bg-blue-50 border border-blue-300 rounded-md flex flex-col  gap-2 text-base h-full lg:h-120.5 p-4 w-full lg:w-80">
              <h1 className="text-blue-400 font-semibold text-base">Merge Data</h1>
            <h2 className="flex flex-col gap-1 ">
              <span className="text-gray-500">Name</span>
             <span>{mergeValues.name}</span> 
            </h2>
            <p className="flex flex-col gap-1">
              <span className="text-gray-500">Email</span>
             <span>{mergeValues.email}</span> 
            </p>
            <p className="flex flex-col gap-1">
             <span className="text-gray-500">Gender</span>
             <span>{mergeValues.gender}</span>
            </p>
            <p className="flex flex-col gap-1">
              <span className="text-gray-500">Phone</span>
              <span>{mergeValues.phone}</span>
            </p>
            <p className="flex flex-col gap-1">
              <span className="text-gray-500">DateRegistered</span>
              <span>{mergeValues.dateRegistered}</span>
            </p>
            <p className="flex flex-col gap-1">
              <span className="text-gray-500">Country</span>
              <span>{ mergeValues.country}</span>
            </p>
                </div>
        </div>
        <div className="flex items-center justify-center pt-6">
          <Button variant="default" className="px-12! py-3! cursor-pointer bg-blue-500! font-medium! text-base" onClick={()=>setShowMerge(true)}>Next</Button>
          </div>
          </div>
        {showMerge && (
          <MergeDisplay mergeValues={mergeValues} setShowMerge={setShowMerge} />
        )}
    </div>
  );
}
