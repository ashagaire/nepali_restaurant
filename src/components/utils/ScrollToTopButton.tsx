"use client";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button className="custom-button-scroll-top" onClick={scrollToTop}>
      <span className="footer-nav-link ">
        {FaArrowUp({ className: "text-l" })}
      </span>
    </button>
  );
}
