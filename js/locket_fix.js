/**
 * @name Locket Gold & Recording Fix 2026
 * @description Fix lỗi 5 giây và mở khóa Gold dựa trên dữ liệu Charles Proxy.
 */

let obj = JSON.parse($response.body);
const url = $request.url;

// 1. Xử lý phần hiện Logo Gold (Qua hệ thống RevenueCat)
if (url.includes("api.revenuecat.com")) {
  const premiumInfo = {
    "expires_date": "2099-12-31T23:59:59Z",
    "original_purchase_date": "2024-01-01T00:00:00Z",
    "purchase_date": "2024-01-01T00:00:00Z",
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };

  if (obj.subscriber) {
    // Sửa các định danh quyền hạn (Entitlements)
    obj.subscriber.entitlements = {
      "gold": premiumInfo,
      "plus": premiumInfo,
      "premium": premiumInfo
    };
    // Sửa danh sách đăng ký (Subscriptions)
    obj.subscriber.subscriptions = {
      "com.locket.gold.yearly": premiumInfo,
      "com.locket.gold.monthly": premiumInfo,
      "com.locket.gold": premiumInfo
    };
  }
}

// 2. Xử lý phần Fix quay 5 giây (Qua hệ thống Locket Camera API)
// Đây là phần file cũ của bạn thiếu dẫn đến lỗi quay phim.
if (url.includes("api.locketcamera.com")) {
  if (obj.data) {
    obj.data.video_duration_limit = 60; // Ép giới hạn lên 60 giây
    obj.data.is_gold = true;
    obj.data.is_premium = true;
    obj.data.tier = "gold";
    obj.data.features = ["long_video", "hd_quality", "no_ads"];
  }
  // Xử lý các gói tin cấu hình khác nếu có
  if (obj.config) {
    obj.config.video_limit = 60;
  }
}

$done({ body: JSON.stringify(obj) });