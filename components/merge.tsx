import { Users } from "./column";
import { useUser } from "./context";
import { Button } from "./ui/button";

type MergeDisplayProps = {
  mergeValues: Users;
  setShowMerge: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MergeDisplay({
  mergeValues,
  setShowMerge,
}: MergeDisplayProps) {
  const { setTableData, selectedUsers, setOpen, setSelectedUsers } = useUser();
  const merge = () => {
    setTableData((prev) => {
      const filteredUsers = prev.filter(
        (user) => !selectedUsers.some((selected) => selected.id === user.id),
      );
      return [mergeValues, ...filteredUsers];
    });
    setOpen(false);
    setSelectedUsers([]);
  };

  return (
    <>
      <div className="bg-white border border-blue-100 rounded-md flex flex-col gap-2 text-base h-full p-6 w-full">
        <div className="flex gap-3 items-center">
          <div>
            <img src={mergeValues.avatar} alt="avatar" className="w-40 h-40 rounded-full"/>
          </div>
          <p className="flex flex-col gap-1">
            <span className="text-gray-500">Name</span>
            <span className="text-sm">{mergeValues.name}</span>
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base pt-6">
          <div className="flex items-center gap-3 ">
            <div>
              <img src="/icons8-email-25 (1).png" alt="" />
            </div>

            <p className="flex flex-col gap-0.5">
              <span>Email</span>
              <span className="text-blue-400 text-sm">{mergeValues.email}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <img src="/icons8-gender-26.png" alt="" className="w-7 h-4" />
            </div>
            <p className="flex flex-col gap-1">
              <span>Gender</span>
              <span className="text-sm">{mergeValues.gender}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <img src="/icons8-phone-50.png" alt="" className="w-6 h-6" />
            </div>
            <p className="flex flex-col gap-1">
              <span>Phone</span>
              <span className="text-sm"> {mergeValues.phone}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <img src="/icons8-country-48.png" alt="" className="w-6 h-6" />
            </div>
            <p className="flex flex-col gap-1">
              <span>Country</span>
              <span className="text-sm"> {mergeValues.country}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <img src="/icons8-country-48.png" alt="" className="w-6 h-6" />
            </div>
            <p className="flex flex-col gap-1">
              <span className="text-sm">Date Registered</span>
              <span>{mergeValues.dateRegistered}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-end pt-8">
          <Button
            className="bg-white! text-gray-400! border-gray-400! px-6! py-4! cursor-pointer"
            onClick={() => setShowMerge(false)}
          >
            Back
          </Button>
          <Button
            className="bg-blue-500! px-6! py-4! cursor-pointer"
            onClick={merge}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
