export type Country = {
  id: number;
  country_name_ja: string;
  country_name_en: string;
  country_code: string;
  country_flag_emoji: string | null;

  // カテゴリ① 入国要件
  visa_required: boolean;
  visa_on_arrival: boolean;
  esta_required: boolean;
  visa_notes: string | null;
  passport_validity_months: number | null;
  return_ticket_required: boolean;
  entry_documents: string | null;

  // カテゴリ② 電気・電源
  plug_type: string | null;
  voltage: number | null;
  plug_image_url: string | null;

  // カテゴリ③ 通信・SIM
  sim_airport_available: boolean | null;
  esim_supported: boolean | null;
  wifi_quality: string | null;

  // カテゴリ④ お金・決済
  currency_name: string | null;
  currency_code: string | null;
  tip_culture: string | null;
  card_usage: string | null;
  exchange_notes: string | null;

  // カテゴリ⑤ 安全・健康
  safety_level: number | null;
  safety_notes: string | null;
  tap_water_safe: boolean | null;
  vaccination_required: string | null;
  insurance_required: boolean;

  // カテゴリ⑥ 持ち込み禁止・注意品
  prohibited_items: string | null;

  // カテゴリ⑦ 文化・マナー
  culture_notes: string | null;

  // カテゴリ⑧ 緊急連絡先
  emergency_police: string | null;
  emergency_ambulance: string | null;
  emergency_fire: string | null;
  embassy_phone: string | null;
  embassy_address: string | null;

  // メタ情報
  last_updated: string | null;
  is_manually_verified: boolean;
};

export type CountrySummary = Pick<
  Country,
  | 'id'
  | 'country_name_ja'
  | 'country_name_en'
  | 'country_code'
  | 'country_flag_emoji'
  | 'visa_required'
  | 'safety_level'
  | 'is_manually_verified'
>;
