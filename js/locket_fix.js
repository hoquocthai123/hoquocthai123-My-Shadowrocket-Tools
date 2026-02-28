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
  obj.subscriber.entitlements = { "gold": premium, "Gold": premium };
  obj.subscriber.subscriptions = { "locket_1600_1y": premium };
}

// --- PHẦN 2: FIX HUY HIỆU & QUAY 5S (LOCKET CAMERA API) ---
if (url.includes("api.locketcamera.com")) {
  // Fix huy hiệu dựa trên request bạn soi được
  if (obj.data) {
    obj.data.badge = "locket_gold"; 
    obj.data.video_duration_limit = 60;
    obj.data.is_gold = true;
    obj.data.is_premium = true;
    obj.data.tier = "gold";
  }
  
  // Ép thêm vào các biến hệ thống khác để chắc chắn 100%
  obj.video_duration_limit = 60;
  obj.is_gold = true;
  obj.is_premium = true;
  obj.tier = "gold";
  obj.badge = "locket_gold";

  if (obj.user) {
    obj.user.is_gold = true;
    obj.user.video_duration_limit = 60;
    obj.user.badge = "locket_gold";
  }
}

$done({ body: JSON.stringify(obj) });