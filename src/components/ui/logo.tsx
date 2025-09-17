import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="bg-primary px-3 py-2 rounded-lg shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-primary/20">
        <span className="text-2xl font-black tracking-tight text-primary-foreground relative z-10 text-white">KR</span>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-extrabold tracking-tight leading-none text-gray-600">KORAN</span>
        <span className="text-lg font-extrabold leading-none text-primary tracking-[0.1em]">SIDAK</span>
      </div>
    </Link>
  );
}
