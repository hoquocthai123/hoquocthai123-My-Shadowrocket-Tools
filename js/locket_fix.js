/**
 * @name Locket Gold & Recording Fix 2026
 * @description Fix lỗi 5 giây và mở khóa Gold dựa trên dữ liệu thực tế từ Charles.
 */

let obj = JSON.parse($response.body);
const url = $request.url;

// 1. Xử lý hiện Logo Gold và Badge (Qua hệ thống RevenueCat)
if (url.includes("api.revenuecat.com")) {
  const premium = {
    "expires_date": "2099-12-31T23:59:59Z",
    "original_purchase_date": "2024-01-01T00:00:00Z",
    "purchase_date": "2024-01-01T00:00:00Z",
    "store": "app_store",
    "ownership_type": "PURCHASED"
  };
  
  if (obj.subscriber) {
    obj.subscriber.entitlements = {
      "gold": premium,
      "plus": premium,
      "premium": premium
    };
    obj.subscriber.subscriptions = {
      "com.locket.gold.yearly": premium,
      "com.locket.gold.monthly": premium
    };
  }
}

// 2. Xử lý tính năng quay phim 5s (Qua hệ thống Locket API)
if (url.includes("api.locketcamera.com")) {
  // Sửa trực tiếp giới hạn thời gian quay phim
  if (obj.data) {
    obj.data.video_duration_limit = 60;
    obj.data.is_gold = true;
    obj.data.is_premium = true;
    obj.data.tier = "gold";
  }
  
  // Một số bản Locket trả về thông tin user trực tiếp ở cấp cao nhất
  obj.video_duration_limit = 60;
  obj.is_gold = true;
  obj.is_premium = true;
  obj.tier = "gold";
  
  if (obj.user) {
    obj.user.is_gold = true;
    obj.user.video_duration_limit = 60;
  }
}

$done({ body: JSON.stringify(obj) });