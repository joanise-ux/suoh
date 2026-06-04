"use client";

import { useStore } from "@/lib/store";

export default function AnnouncementBar() {
  const { t } = useStore();

  return (
    <div className="bg-burnt text-champagne text-center py-2.5 text-[11px] tracking-[0.2em] uppercase overflow-hidden relative z-[101]">
      <div className="inline-flex gap-15 animate-[marquee_22s_linear_infinite] whitespace-nowrap">
        <span>
          ✦ {t("Free shipping above 200 PLN", "Darmowa wysyłka powyżej 200 PLN")}
          &nbsp;&nbsp;
          {t("Handmade in Poland", "Ręcznie robione w Polsce")}
        </span>
        <span>
          ✦ {t("Each piece is unique", "Każda sztuka jest wyjątkowa")}
        </span>
        <span>
          ✦ {t("Free shipping above 200 PLN", "Darmowa wysyłka powyżej 200 PLN")}
          &nbsp;&nbsp;
          {t("Handmade in Poland", "Ręcznie robione w Polsce")}
        </span>
        <span>
          ✦ {t("Each piece is unique", "Każda sztuka jest wyjątkowa")}
        </span>
      </div>
    </div>
  );
}
