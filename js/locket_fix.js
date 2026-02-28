/**
 * @name Locket Gold & Recording Fix 2026
 * @author hoquocthai123
 */

let body = $response.body;
if (!body) $done({}); // Nếu không có nội dung thì bỏ qua để tránh lỗi

let obj = JSON.parse(body);
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
    obj.subscriber.entitlements = obj.subscriber.entitlements || {};
    obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
    
    // Mở khóa cho cả gold (thường) và Gold (viết hoa) để chắc chắn
    obj.subscriber.entitlements["gold"] = premium;
    obj.subscriber.entitlements["Gold"] = premium;
    obj.subscriber.entitlements["plus"] = premium;
    
    obj.subscriber.subscriptions["com.locket.gold.yearly"] = premium;
    obj.subscriber.subscriptions["locket_1600_1y"] = premium;
  }
}

// --- PHẦN 2: FIX HUY HIỆU & QUAY 5S (LOCKET CAMERA API) ---
if (url.includes("api.locketcamera.com")) {
  // Hàm bổ trợ để "bơm" Gold vào mọi ngóc ngách dữ liệu
  const injectGold = (target) => {
    if (target) {
      target.badge = "locket_gold"; // Fix huy hiệu dựa trên Charles của bạn
      target.video_duration_limit = 60; // Fix lỗi 5 giây
      target.is_gold = true;
      target.is_premium = true;
      target.tier = "gold";
    }
  };

  injectGold(obj);
  injectGold(obj.data);
  injectGold(obj.user);
  
  // Fix phản hồi success mà bạn soi thấy
  if (obj.result) obj.result.success = true;
}

$done({ body: JSON.stringify(obj) });