import { Rate } from "antd";
import Image from "next/image";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
export default function UI() {
  return (
    <div className="mt-[124px] bg-slate-300 p-5 flex flex-col gap-32  ">
      <div className="flex flex-col max-w-60 bg-white dark:bg-slate-800 dark:text-white shadow-xl gap-1 border dark:border-slate-700 rounded-3xl p-3">
        <div className="flex font-thin justify-end">id: 12345789</div>
        <div className="flex flex-row gap-2">
          <div className="w-[90%]">
            <Image
              src={"/side cards/side Coffee Lovers/CL1.png"}
              alt="product"
              width={1000}
              height={1000}
              className="w-40 h-44"
            />
          </div>

          <div>
            <div className="rounded-full p-2 bg-black dark:bg-slate-600">
              <GoHeart size={22} className="text-white" />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <div className="text-start font-semibold flex justify-start">
            Electric Boiler
          </div>
          <div className="flex flex-row gap-3">
            <div>
              <Rate value={5} className="text-xs dark:text-yellow-400" />
            </div>
            <div className="flex flex-row gap-1 items-center text-xs">
              <div>✉</div>
              <div>97</div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center mt-4">
            <div className="flex flex-col">
              <div className="flex flex-row gap-1 items-center">
                <div className="font-mono line-through">$999.00</div>
                <div className="bg-blue-100 dark:bg-blue-900 px-1 rounded font-semibold text-xs">
                  -10%
                </div>
              </div>

              <div className="font-bold text-2xl">$899.00</div>
            </div>

            <div className="p-3 bg-blue-500 dark:bg-blue-700 rounded-lg">
              🛒
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-8 bg-white dark:bg-slate-800 dark:text-white p-3">
        {/* Left Section */}
        <div className="flex flex-col w-1/2">
          <div className="font-semibold">Shopping Continue</div>
          <hr className="border-gray-300 dark:border-slate-600" />

          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="text-lg font-bold">Favorite Products</div>
              <div>You have 3 in your cart</div>
            </div>

            <div className="flex flex-row bg-slate-50 dark:bg-slate-700 rounded-2xl shadow-lg gap-3 p-1 items-center">
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
                <div className="font-semibold">Italy Pizza</div>
                <div>Extra Cheese and i do not know</div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row gap-1 items-center">
                  <div className="font-mono line-through">$999.00</div>
                  <div className="bg-blue-100 dark:bg-blue-900 px-1 rounded font-semibold text-xs">
                    -10%
                  </div>
                </div>

                <div className="font-semibold text-xl">$899.00</div>
              </div>
              <div className="px-3">
                <FaTrashAlt className="text-black dark:text-white" size={23} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-1/2 gap-3 justify-center text-white rounded-2xl bg-indigo-600 dark:bg-indigo-800">
          <div className="text-white text-2xl py-3 font-semibold text-center">
            Favorite Categories
          </div>
          <hr className="border-gray-300 dark:border-slate-600" />
          <div className="flex flex-row items-center w-full">
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
              <FaTrashAlt
                className="text-white dark:text-slate-300"
                size={23}
              />
            </div>
          </div>
          <div className="flex flex-row items-center w-full">
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
              <FaTrashAlt
                className="text-white dark:text-slate-300"
                size={23}
              />
            </div>
          </div>
          <div className="flex flex-row items-center w-full">
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
              <FaTrashAlt
                className="text-white dark:text-slate-300"
                size={23}
              />
            </div>
          </div>
          <hr className="bg-gray-400 dark:bg-slate-600" />
        </div>
      </div>

      <div className="rounded-xl bg-white dark:bg-slate-800 dark:text-white flex flex-col sm:flex-row p-3 relative">
        {/* Trash Icon */}
        <div className="absolute z-30 top-2 sm:top-0 right-2 sm:right-6 rounded-bl-lg rounded-br-lg py-1 px-2 flex items-center">
          <button className="text-red-500 self-start">
            <FaTrashAlt className="w-6 h-6" />
          </button>
        </div>

        {/* Product Info (Left) */}
        <div className="flex flex-col flex-1 justify-between">
          {/* Product Name */}
          <div className="mb-3 font-light text-sm">Apple</div>

          {/* Description */}
          <div className="text-xl font-bold   mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            suscipit voluptatem repudiandae pariatu.
          </div>

          {/* Ratings */}
          <div className="flex flex-row gap-2 items-center mb-3">
            <div>
              <Rate value={5} className="dark:text-white" />
            </div>
            <div className="font-serif text-sm">9,899 reviews</div>
          </div>

          {/* Pricing */}
          <div className="flex flex-row gap-2 items-center mb-3">
            <div className="font-bold text-xl line-through">$289</div>
            <div className="font-bold text-xl text-green-600">$189</div>
            <div className="p-1 bg-red-200 text-red-600 font-semibold rounded-2xl text-sm dark:bg-red-800 dark:text-red-400">
              20% OFF
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex flex-row items-center gap-4">
            <button className="px-3 py-1 bg-gray-200 dark:bg-slate-600 dark:text-white rounded-lg text-black font-semibold hover:bg-gray-300 dark:hover:bg-slate-500">
              -
            </button>
            <div className="text-xl font-bold">1</div>
            <button className="px-3 py-1 bg-gray-200 dark:bg-slate-600 dark:text-white rounded-lg text-black font-semibold hover:bg-gray-300 dark:hover:bg-slate-500">
              +
            </button>
          </div>
        </div>

        {/* Image (Right) */}
        <div className="flex justify-center items-center mt-5 sm:mt-0 sm:ml-5">
          <Image
            src={"/side cards/side Coffee Lovers/CL1.png"}
            alt="product"
            width={1000}
            height={1000}
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
