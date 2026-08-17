import { useEffect, useRef, useState } from "react";

export default function DeferredSection({ id, children }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || ready) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ready]);

  return (
    <div ref={ref} id={ready ? undefined : id} className={ready ? undefined : "min-h-[100dvh] bg-[#0a0a0a]"}>
      {ready ? children : null}
    </div>
  );
}
