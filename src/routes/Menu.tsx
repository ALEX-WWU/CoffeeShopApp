import { CheckoutItem, MenuItem } from "@/components";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { initMenus, loadFromLocalStorage } from "@/redux";
import { format } from "date-fns";

function Menu() {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector((state) => state.menus);
  const { menus } = useAppSelector((state) => state.orders);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(initMenus());
    dispatch(loadFromLocalStorage());
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid h-full grid-cols-3">
      <div className="col-span-2 grid h-full grid-rows-[auto,1fr] px-2 pb-2">
        <div className="relative">
          <Input
            placeholder="Search..."
            className="mt-2 text-lg"
            value={searchInput}
            onChange={(e) => setSearchInput(e.currentTarget.value)}
          />
          <FaMagnifyingGlass className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 opacity-75" />
        </div>
        <div className="relative mt-2">
          <div className="absolute inset-0 overflow-y-auto">
            <div className="grid grid-cols-[repeat(auto-fill,200px)] grid-rows-[repeat(auto-fill,auto)] justify-center gap-2">
              {data.map(
                (item) =>
                  (item.name
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                    searchInput === "") && (
                    <MenuItem
                      imageSrc={item.picture}
                      title={item.name}
                      className=""
                      key={item.name}
                      data={item.data}
                    ></MenuItem>
                  ),
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-[auto,1fr,auto] border-l px-4">
        <div className="flex justify-between border-y py-2">
          <div className="font-bold">Order</div>
          <div>{format(new Date(), "qo MMM R - HH:mm:ss")}</div>
        </div>
        <div className="relative h-auto">
          <div className="absolute inset-0 overflow-auto pr-4">
            {menus.map((item) => (
              <CheckoutItem {...item} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t py-4">
          <div>
            <div>
              Total :{" "}
              <span>
                $
                {menus.reduce(
                  (total, menu) => total + menu.price * menu.quantity,
                  0,
                )}
              </span>
            </div>
            <div>
              Discount(0%) : <span>0%</span>
            </div>
            <div>
              Checkout :{" "}
              <span>
                $
                {menus.reduce(
                  (total, menu) => total + menu.price * menu.quantity,
                  0,
                )}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg px-3 py-3 font-bold shadow outline outline-[2px] outline-slate-400 hover:bg-blue-400 hover:text-white">
              Discount
            </button>
            <button className="rounded-lg px-6 py-3 font-bold shadow outline outline-[2px] outline-slate-400 hover:bg-green-400 hover:text-white">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
