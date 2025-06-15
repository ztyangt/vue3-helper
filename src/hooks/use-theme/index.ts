import "./index.scss";
import { useDark } from "@vueuse/core";

export const useTheme = () => {
  const isDark = useDark({
    selector: "html",
    attribute: "class",
    valueDark: "dark",
    valueLight: "light",
  });

  const toggleTheme = async (event?: MouseEvent, animate = false) => {
    if (!animate) {
      isDark.value = !isDark.value;
      return;
    }
    if (!event) {
      isDark.value = !isDark.value;
      return;
    }
    try {
      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

      let dark: boolean;

      // @ts-ignore
      const transition = document.startViewTransition(() => {
        const root = document.documentElement;
        dark = root.classList.contains("dark");
        root.classList.add(dark ? "light" : "dark");
        root.classList.remove(dark ? "dark" : "light");
      });

      transition.ready.then(() => {
        const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
        document.documentElement.animate(
          {
            clipPath: dark ? [...clipPath].reverse() : clipPath,
          },
          {
            duration: 500,
            easing: "ease-in",
            pseudoElement: dark ? "::view-transition-old(root)" : "::view-transition-new(root)",
          }
        );
      });

      await transition.finished;
      isDark.value = !isDark.value;
    } catch {
      isDark.value = !isDark.value;
    }
  };

  return { isDark, toggleTheme };
};
