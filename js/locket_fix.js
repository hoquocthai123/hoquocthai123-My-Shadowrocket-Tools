let obj = JSON.parse($response.body);
const url = $request.url;

if (url.includes("api.revenuecat.com")) {
  const premium = {
    "expires_date": "2099-12-31T23:59:59Z",
    "original_purchase_date": "2024-01-01T00:00:00Z",
    "purchase_date": "2024-01-01T00:00:00Z",
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };
  obj.subscriber.entitlements = { "gold": premium, "plus": premium };
  obj.subscriber.subscriptions = { "com.locket.gold.yearly": premium };
}

if (url.includes("api.locketcamera.com")) {
  // Fix lỗi quay phim 5s dựa trên dữ liệu Charles bạn soi được
  if (obj.data) {
    obj.data.video_duration_limit = 60;
    obj.data.is_gold = true;
    obj.data.is_premium = true;
    obj.data.tier = "gold";
  }
}

$done({ body: JSON.stringify(obj) });