import type { LocalizedString } from '../types/common';

export const fishDictionary: Record<string, LocalizedString> = {
  アジ: { ja: "アジ", ne: "आजी", en: "Horse Mackerel" },
  マグロ: { ja: "マグロ", ne: "मागुरा", en: "Tuna" },
  サーモン: { ja: "サーモン", ne: "साल्मन", en: "Salmon" }
  // 他の魚もここに追加可能
};

export const generalMessages: Record<string, LocalizedString> = {

  emailLabel: { ja: "メール:", en: "Email:", ne: "इमेल:" },
  tableOfContentsTitle: { ja: "目次", en: "Table of Contents", ne: "विषयसूची" },
  taskItemProcedureLabel: { ja: "手順", en: "Procedure", ne: "प्रक्रिया" },
  taskItemPointLabel: { ja: "ポイント", en: "Points", ne: "बिन्दु" },
  nextButtonText: { ja: "次に進む", en: "Next", ne: "अर्को" },
  nextPagePrefix: { ja: "次は:", en: "Next:", ne: "अब:" },
  prevButtonText: { ja: "前に戻る", en: "Previous", ne: "अघिल्लो" },
  prevPagePrefix: { ja: "前は:", en: "Previous:", ne: "पहिले:" },
};
