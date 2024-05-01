import { assets } from "../../../assets/assets";
import { useStore } from "../../../context/StoreContext";

const Product = () => {
  const { products, cartItems, addToCart, removeFormCart } = useStore();

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4  sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Avilable Products
          </h2> */}

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      {/* <a href={product.href}> */}
                      <span aria-hidden="true" className="absolute inset-0 " />
                      {product.name}
                      {/* </a> */}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                    {!cartItems[product._id] ? (
                      <img
                        className="add w-[25px] absolute cursor-pointer border-[50%]"
                        onClick={() => addToCart(product._id)}
                        src={assets.add_icon_white}
                        alt=""
                      />
                    ) : (
                      <div className="food-item-counter absolute right-[0px] flex items-center gap-1 ">
                        <img
                          className="w-[20px] cursor-pointer"
                          onClick={() => removeFormCart(product._id)}
                          src={assets.remove_icon_red}
                          alt=""
                        />
                        <p>{cartItems[product._id]}</p>
                        <img
                          className="w-[20px] cursor-pointer"
                          onClick={() => addToCart(product._id)}
                          src={assets.add_icon_green}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
