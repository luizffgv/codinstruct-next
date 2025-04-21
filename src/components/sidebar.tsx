"use client";

import { usePathname } from "next/navigation";
import type { Metadata } from "@scripts/content-metadata";
import styles from "./sidebar.module.css";
import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";

export default function Sidebar({ metadata }: { metadata: Metadata }) {
  const [expanded, setExpanded] = useState(false);
  const sidebarId = useId();

  useEffect(() => {
    let lastTouch: Touch | null = null;
    let movedPixels = { x: 0, y: 0 };

    // Cancels swipe if it scrolls any element that isn't fully scrolled in the
    // X axis, otherwise the sidebar will show up even when scrolling elements.
    function scrollListener(event: Event) {
      const target = event.target;
      if (target instanceof HTMLElement) {
        if (target.scrollLeft + target.clientWidth < target.scrollWidth) {
          lastTouch = null;
          [movedPixels.x, movedPixels.y] = [0, 0];
        }
      }
    }

    const otherListeners = {
      touchstart(event: TouchEvent) {
        lastTouch = event.touches[0];
      },

      touchmove(event: TouchEvent) {
        for (let i = 0; i < event.changedTouches.length; ++i) {
          const touch = event.changedTouches[i];
          if (touch.identifier == lastTouch?.identifier) {
            movedPixels.x += touch.clientX - lastTouch.clientX;
            movedPixels.y += touch.clientY - lastTouch.clientY;

            lastTouch = touch;
          }
        }
      },

      touchend(event: TouchEvent) {
        let found = false;
        for (let i = 0; i < event.touches.length; ++i) {
          const touch = event.touches[i];
          if (touch.identifier == lastTouch?.identifier) found = true;
        }

        if (!found) {
          if (Math.abs(movedPixels.x / movedPixels.y) > 2)
            if (movedPixels.x > 15) setExpanded(false);
            else if (movedPixels.x < -15) setExpanded(true);

          lastTouch = null;
          [movedPixels.x, movedPixels.y] = [0, 0];
        }
      },
    };

    addEventListener("scroll", scrollListener, { capture: true });
    let event: keyof typeof otherListeners;
    for (event in otherListeners)
      addEventListener(event, otherListeners[event]);

    return () => {
      removeEventListener("scroll", scrollListener, { capture: true });
      let event: keyof typeof otherListeners;
      for (event in otherListeners)
        removeEventListener(event, otherListeners[event]);
    };
  });

  const pathname = usePathname();

  const languageMetadata = useMemo(() => {
    const language = /^\/linguagens\/(\w+)/.exec(pathname)?.[1];

    return metadata.languages.find(({ path }) => path == language);
  }, [metadata.languages, pathname]);

  if (languageMetadata == undefined)
    throw new TypeError("Couldn't determine which language you are browsing.");

  return (
    <>
      <button
        type="button"
        className={styles["expand-button"]}
        onClick={() => setExpanded(true)}
        aria-label="Exibir barra lateral"
        aria-controls={sidebarId}
      >
        <span
          className={["material-symbols-outlined", styles["button-icon"]].join(
            " "
          )}
        >
          arrow_left
        </span>
      </button>
      <nav
        id={sidebarId}
        className={[styles.sidebar, expanded ? styles.expanded : ""].join(" ")}
      >
        <button
          type="button"
          className={styles["contract-button"]}
          onClick={() => setExpanded(false)}
          aria-label="Ocultar barra lateral"
          aria-controls={sidebarId}
        >
          <span
            className={[
              "material-symbols-outlined",
              styles["button-icon"],
            ].join(" ")}
          >
            arrow_right
          </span>
        </button>
        <div className={styles["current-language"]}>
          {languageMetadata.title}
        </div>
        {languageMetadata.categories.map((category) => (
          <details
            key={`${languageMetadata.path}/${category.path}`}
            className={styles.category}
          >
            <summary>{category.title}</summary>
            <div className={styles["entry-list"]}>
              {category.pages.map((page) => (
                <Link
                  key={`${languageMetadata.path}/${category.path}/${page.path}`}
                  className={styles.entry}
                  href={`/linguagens/${languageMetadata.path}/${category.path}/${page.path}`}
                  data-active={pathname.endsWith(
                    `${languageMetadata.path}/${category.path}/${page.path}`
                  )}
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </details>
        ))}
      </nav>
    </>
  );
}
