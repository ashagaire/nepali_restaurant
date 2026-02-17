import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex-shrink-0 max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[150px]">
      <div style={{ position: "absolute", top: "8px" }}>
        <Link
          href="/"
          className="cursor-pointer text-[#d92cf9] hover:text-purple-600"
        >
          <img
            src="/images/logo1.png"
            alt="Asha Signature"
            className="w-auto max-h-24 sm:max-h-24 md:max-h-32 lg:max-h-32"
          />
        </Link>
      </div>
    </div>
  );
};
export default Logo;
