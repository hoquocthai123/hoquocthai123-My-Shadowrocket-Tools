/**
 * @name Locket Gold Ultra Fix 2026
 * @description Fix Huy hiệu Gold, Logo và Lỗi quay phim 5s.
 */

let obj = JSON.parse($response.body);
const url = $request.url;

// --- PHẦN 1: MỞ KHÓA LOGO GOLD (REVENUECAT) ---
if (url.includes("api.revenuecat.com")) {
  const premium = {
    "expires_date": "9999-12-31T23:59:59Z",
    "original_purchase_date": "2024-01-01T00:00:00Z",
    "purchase_date": "2024-01-01T00:00:00Z",
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };
  if (obj.subscriber) {
    obj.subscriber.entitlements = { "gold": premium, "Gold": premium };
    obj.subscriber.subscriptions = { "locket_1600_1y": premium };
  }
}

// --- PHẦN 2: FIX HUY HIỆU & QUAY 5S (LOCKET CAMERA API) ---
if (url.includes("api.locketcamera.com")) {
  // Fix phản hồi xác nhận thành công (dựa trên dữ liệu Charles bạn vừa gửi)
  if (obj.result && obj.result.success === true) {
    // Không cần sửa gì ở đây để giữ cho app tin là đã lưu badge thành công
  }

  // Ép thông tin Gold và thời gian quay vào mọi phản hồi chứa dữ liệu User/Config
  const applyGold = (target) => {
    if (target) {
      target.badge = "locket_gold";
      target.video_duration_limit = 60;
      target.is_gold = true;
      target.is_premium = true;
      target.tier = "gold";
    }
  };

  applyGold(obj);
  applyGold(obj.data);
  applyGold(obj.user);
}

$done({ body: JSON.stringify(obj) });