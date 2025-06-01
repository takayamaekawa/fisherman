import type { LocalizedString } from '../types/common';

export const fishDictionary: Record<string, LocalizedString> = {
  アジ: { ja: "アジ", ne: "आजी", en: "Horse Mackerel" },
  マグロ: { ja: "マグロ", ne: "मागुरा", en: "Tuna" },
  サーモン: { ja: "サーモン", ne: "साल्मन", en: "Salmon" }
  // 他の魚もここに追加可能
};

export const generalMessages: Record<string, LocalizedString> = {
  homeTitle: { ja: "ホーム", en: "Home", ne: "गृह पृष्ठ" },
  homeDescription: { ja: "あるスーパーの鮮魚コーナーでの情報を提供します。", en: "Providing information from a certain fish market.", ne: "एक निश्चित माछा बजारबाट जानकारी प्रदान गर्दै।" },
  staffTitle: { ja: "スタッフ", en: "Staff", ne: "कर्मचारी" },
  staffDescription: { ja: "スタッフ情報をお届けします。", en: "Meet our staff.", ne: "हाम्रा कर्मचारीहरूलाई भेट्नुहोस्。" },
  staffSpecialtyLabel: { ja: "得意なこと:", en: "Specialty:", ne: "विशेषज्ञता:" },
  staffHobbyLabel: { ja: "趣味:", en: "Hobby:", ne: "शौक" },
  tasksTitle: { ja: "タスク", en: "Tasks", ne: "कार्यहरु" },
  tasksDescription: { ja: "業務内容をお届けします。", en: "Here are the task details.", ne: "यहाँ कार्य विवरणहरू छन्。" },
  contactTitle: { ja: "コンタクト", en: "Contact", ne: "सम्पर्क" },
  contactDescription: { ja: "連絡や問い合わせは以下からお願いします。", en: "Please contact us using the information below.", ne: "कृपया तलको जानकारी प्रयोग गरी हामीलाई सम्पर्क गर्नुहोस्。" }, telLabel: { ja: "電話:", en: "TEL:", ne: "फोन:" },
  emailLabel: { ja: "メール:", en: "Email:", ne: "इमेल:" },
  tableOfContentsTitle: { ja: "目次", en: "Table of Contents", ne: "विषयसूची" },
  taskItemProcedureLabel: { ja: "手順", en: "Procedure", ne: "प्रक्रिया" },
  taskItemPointLabel: { ja: "ポイント", en: "Points", ne: "बिन्दु" },
  nextButtonText: { ja: "次に進む", en: "Next", ne: "अर्को" },
  nextPagePrefix: { ja: "次は:", en: "Next:", ne: "अब:" },
  prevButtonText: { ja: "前に戻る", en: "Previous", ne: "अघिल्लो" },
  prevPagePrefix: { ja: "前は:", en: "Previous:", ne: "पहिले:" },
};
