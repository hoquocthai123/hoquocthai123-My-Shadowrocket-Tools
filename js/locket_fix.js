/**
 * @name Locket Gold & 5s Fix
 * @author hoquocthai123
 */

let obj = JSON.parse($response.body);
const url = $request.url;

// --- PHẦN 1: HIỆN LOGO GOLD (REVENUECAT) ---
if (url.includes("api.revenuecat.com")) {
  const info = {
    "expires_date": "9999-01-01T00:00:00Z",
    "original_purchase_date": "2024-01-01T00:00:00Z",
    "purchase_date": "2024-01-01T00:00:00Z",
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };
  
  obj.subscriber.entitlements = {
    "Gold": info,
    "gold": info
  };
  obj.subscriber.subscriptions = {
    "locket_1600_1y": info
  };
}

// --- PHẦN 2: FIX QUAY 5S (LOCKET CAMERA API) ---
// Dựa trên gói tin /v1/users/me bạn soi thấy trong Charles
if (url.includes("api.locketcamera.com")) {
  // Sửa giới hạn thời gian quay phim từ 5 thành 60
  obj.video_duration_limit = 60;
  obj.is_gold = true;
  obj.is_premium = true;
  obj.tier = "gold";
  
  if (obj.data) {
    obj.data.video_duration_limit = 60;
    obj.data.is_gold = true;
  }
  
  if (obj.user) {
    obj.user.is_gold = true;
    obj.user.video_duration_limit = 60;
  }
}

$done({ body: JSON.stringify(obj) });