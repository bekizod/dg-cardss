import { Rate } from "antd";
import Image from "next/image";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
export default function UI() {
  return (
    <div className="mt-[124px] bg-slate-300 p-5 flex flex-col gap-32  ">
      <div className="mt-[124px] bg-slate-300 p-5 flex  gap-32  ">
        <div className="flex flex-col bg-white shadow-xl gap-1 border rounded-3xl p-3">
          <div className="flex font-thin justify-end">id: 12345789</div>
          <div className="flex flex-row gap-2">
            <div className="w-[90%] ">
              <Image
                src={"/side cards/side Coffee Lovers/CL1.png"}
                alt="product"
                width={1000}
                height={1000}
                className="w-40 h-44"
              />
            </div>

            <div className="">
              <div className="rounded-full p-2 bg-black">
                <GoHeart size={22} className="text-white" />
              </div>
            </div>
          </div>

          <div className="flex w-full  flex-col  ">
            <div className="text-start font-semibold flex justify-start">
              Electric Boiler
            </div>
            <div className="flex flex-row gap-3 ">
              <div>
                <Rate value={5} className="text-xs" />
              </div>
              <div className="flex flex-row gap-1 items-center  text-xs">
                <div>✉</div>
                <div>97</div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center mt-4">
            <div className="flex flex-col">
              <div className="flex flex-row gap-1 items-center">
                <div className="font-mono line-through">$999.00</div>
                <div className="bg-blue-100 px-1 rounded font-semibold text-xs">
                  -10%
                </div>
              </div>

              <div className="font-bold  text-2xl">$899.00</div>
            </div>

            <div className="p-3 bg-blue-500 rounded-lg">🛒</div>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-8 bg-white p-3">
        <div className="flex flex-col w-1/2">
          <div className="font-semibold">Shopping Continue</div>
          <hr />

          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="text-lg font-bold">Favorite Products</div>
              <div>You have 3 in your cart</div>
            </div>

            <div className="flex flex-row bg-slate-50   rounded-2xl shadow-lg gap-3 p-1 items-center">
              <div>
                <Image
                  src={"/side cards/side Coffee Lovers/CL1.png"}
                  alt="product"
                  width={1000}
                  height={1000}
                  className="w-36 h-36 rounded-lg"
                />
              </div>
              <div className="flex flex-col w-[60%]">
                <div className="font-semibold"> Italy Pizza</div>
                <div>Extra Cheese and i do not know</div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row gap-1 items-center">
                  <div className="font-mono line-through">$999.00</div>
                  <div className="bg-blue-100 px-1 rounded font-semibold text-xs">
                    -10%
                  </div>
                </div>

                <div className="font-semibold  text-xl">$899.00</div>
              </div>
              <div className="px-3">
                <FaTrashAlt className="text-black" size={23} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/2 gap-3 justify-center text-white  rounded-2xl bg-indigo-600">
          <div className="text-white text-2xl py-3  font-semibold text-center">
            Favorite Categories
          </div>
          <hr />
          <div className="flex flex-row items-center  w-full ">
            <div className="w-[20%]">
              <Image
                src={"/side navs/Home Appliances.png"}
                alt="product"
                width={1000}
                height={1000}
                className="w-24 h-24 rounded-lg"
              />
            </div>
            <div className="text-start w-[70%] font-bold text-xl">Machines</div>
            <div>
              <FaTrashAlt className="text-white" size={23} />
            </div>
          </div>
          <div className="flex flex-row items-center  w-full ">
            <div className="w-[20%]">
              <Image
                src={"/side navs/Home Appliances.png"}
                alt="product"
                width={1000}
                height={1000}
                className="w-24 h-24 rounded-lg"
              />
            </div>
            <div className="text-start w-[70%] font-bold text-xl">Machines</div>
            <div>
              <FaTrashAlt className="text-white" size={23} />
            </div>
          </div>
          <div className="flex flex-row items-center  w-full ">
            <div className="w-[20%]">
              <Image
                src={"/side navs/Home Appliances.png"}
                alt="product"
                width={1000}
                height={1000}
                className="w-24 h-24 rounded-lg"
              />
            </div>
            <div className="text-start w-[70%] font-bold text-xl">Machines</div>
            <div>
              <FaTrashAlt className="text-white" size={23} />
            </div>
          </div>
          <hr className="bg-gray-400" />
        </div>
      </div>

      <div className="rounded-xl bg-white flex flex-col p-3">
        <div className="absolute z-30 top-2 sm:top-0 right-0 sm:right-6  rounded-bl-lg rounded-br-lg py-1 px-2 flex items-center">
          <button className="   text-red-500 self-start">
            <FaTrashAlt className="w-6 h-6" />
          </button>
        </div>
        <div className=" ">Apple</div>

        <div className="flex flex-row justify-between">
          <div className="font-bold text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            suscipit voluptatem repudiandae pariatu.
          </div>
          <div className="w-[20%]">
            <Image
              src={"/side cards/side Coffee Lovers/CL1.png"}
              alt="product"
              width={1000}
              height={1000}
              className="w-24 h-24 rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div>
            <Rate value={5} className=" " />
          </div>
          <div className="font-serif">9,899 reviews</div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="font-bold text-xl line-through">$289</div>
          <div className="font-bold text-xl text-green-600">$189</div>
          <div className="p-1 bg-red-200 text-red-600 font-semibold rounded-2xl">
            20% OFF
          </div>
        </div>
      </div>
    </div>
  );
}
