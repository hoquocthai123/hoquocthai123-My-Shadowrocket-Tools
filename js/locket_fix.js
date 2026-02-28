let obj = JSON.parse($response.body);
const url = $request.url;

// 1. Mở khóa Gold (Logo & Badge)
if (url.includes("api.revenuecat.com")) {
  const premium = {
    "expires_date": "2099-12-31T23:59:59Z",
    "original_purchase_date": "2024-01-01T00:00:00Z",
    "purchase_date": "2024-01-01T00:00:00Z",
    "store": "app_store",
    "ownership_type": "PURCHASED"
  };
  obj.subscriber.entitlements = { "gold": premium, "plus": premium };
  obj.subscriber.subscriptions = { "com.locket.gold.yearly": premium };
}

// 2. Fix lỗi quay phim 5s (Tính năng thực tế)
if (url.includes("api.locketcamera.com")) {
  // Sửa trực tiếp ở cấp cao nhất của Object (không qua .data)
  obj.video_duration_limit = 60;
  obj.is_gold = true;
  obj.is_premium = true;
  obj.tier = "gold";
  
  // Nếu có object user bên trong, sửa luôn
  if (obj.user) {
    obj.user.is_gold = true;
    obj.user.video_duration_limit = 60;
  }
}

$done({ body: JSON.stringify(obj) });
