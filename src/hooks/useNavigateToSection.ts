import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

export const useNavigateToSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToSection = useCallback(
    (sectionId: string) => {
      // If we're not on the home page, navigate there first
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // Already on home page, just scroll
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [navigate, location.pathname]
  );

  return navigateToSection;
};
