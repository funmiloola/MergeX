import { Users } from "./column"
import { SecondUserDetails } from "./selectedUsers"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useUser } from "./context"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"

interface Props {
    firstUser?: Users,
    secondUser?: Users,
    mergeValues:Users,
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>
    setShowMerge:React.Dispatch<React.SetStateAction<boolean>>
    updatePrimaryUser: (user: Users) => void
    updateSecondaryUser: (user: Users) => void
    secondUserDetails: SecondUserDetails[]
    search: string
    secondSearch:string
    selectValue: Record<string, boolean>
    swapEntity: () => void
    setSearch: React.Dispatch<React.SetStateAction<string>>
    setSecondSearch: React.Dispatch<React.SetStateAction<string>>
    setSelectedValue: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
    setMergeValues:React.Dispatch<React.SetStateAction<Users>>
}


export default function Filter({setMergeValues,setSelectedValue,swapEntity, firstUser, secondUserDetails, setShowFilter,setShowMerge, mergeValues, updatePrimaryUser, updateSecondaryUser, selectValue, search, setSearch,secondSearch,setSecondSearch }: Props) {
    
    const {userdata} = useUser()
      const filteredUsers = userdata.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );
    return (
        <>
          <div
          className={`flex flex-col lg:flex-row justify-between gap-4 lg:gap-2 items-start w-full`}
        >
          <div>
            <div className="relative">
              <div className="flex flex-col gap-1">
                <Label className="text-xl font-semibold">Primary User</Label>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className=" w-73! outline-none! bg-white! placeholder:font-medium! placeholder:text-gray-400!"
                  placeholder="Search and select primary user..."
                />
              </div>
              {search && filteredUsers.length > 0 && (
                <div className="flex flex-col gap-0.5 absolute h-12 overflow-y-auto bg-white z-5 w-73  no-scrollbar border border-gray-300 rounded-md shadow-md px-2">
                  {filteredUsers.map((u, index) => (
                    <div key={index} onClick={() => updatePrimaryUser(u)}>
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
                <span>{firstUser?.country}</span>
              </p>
            </div>
          </div>
          <div className="lg:pt-10">
            <img
              src="/icons8-back-and-forth-50.png"
              alt=""
              onClick={swapEntity}
              className="w-4 h-4 cursor-pointer"
            />
          </div>
          <div>
            <div className="relative">
              <div className="flex flex-col gap-1">
                <Label className="text-xl font-semibold">Secondary User</Label>
                <Input
                  value={secondSearch}
                  onChange={(e) => setSecondSearch(e.target.value)}
                  className=" w-73! outline-none bg-white! placeholder:font-medium placeholder:text-gray-400 "
                  placeholder="Search and select secondary user..."
                />
              </div>
              {secondSearch && filteredUsers.length > 0 && (
                <div className="flex flex-col gap-0.5 absolute h-12 overflow-y-auto bg-white z-5 w-73 no-scrollbar border border-gray-300 rounded-md shadow-md px-2">
                  {filteredUsers.map((u, index) => (
                    <div key={index} onClick={() => updateSecondaryUser(u)}>
                      <p className="text-base">{u.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white border border-gray-300 rounded-md flex flex-col gap-2 mt-8 text-base p-4 w-full">
              {secondUserDetails.map((s) => (
                <div key={s.key} className="flex flex-col gap-1 ">
                  <h2 className="text-gray-500">
                    {s.key.charAt(0).toUpperCase() + s.key.slice(1)}
                  </h2>
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
                        } else {
                          setMergeValues({
                            name: firstUser?.name || "",
                            email: firstUser?.email || "",
                            gender: firstUser?.gender || "",
                            phone: firstUser?.phone || 0 ,
                            dateRegistered: firstUser?.dateRegistered || "",
                            id: firstUser?.id || 0,
                            country: firstUser?.country || "",
                            avatar:firstUser?.avatar || ""
                          });
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
            <h1 className="text-blue-400 font-semibold text-base">
              Merge Data
            </h1>
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
              <span>{mergeValues.country}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-end pt-8">
          <Button
            className="bg-white! text-gray-400! border-gray-400! px-6! py-4! cursor-pointer"
            onClick={() => setShowFilter(false)}
          >
            Back
          </Button>
          <Button
            className="bg-blue-500! px-6! py-4! cursor-pointer"
            onClick={()=>setShowMerge(true)}
          >
            Next
          </Button>
        </div>
        </>
    )
}