import CategoryScroll from "./CategoryScroll";
import Nav from "./Nav";
export default function Header() {
  return (
    <header className="flex flex-col justify-center text-center px-5">
      <Nav />
      <CategoryScroll />
    </header>
  );
}
