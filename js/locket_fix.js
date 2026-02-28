/**
 * @name Locket Gold Fix (Ultra)
 * @description Mở khóa tính năng Premium Locket và sửa lỗi giới hạn 5 giây.
 * @author Gemini_Assistant_Modified
 */

const obj = JSON.parse($response.body);
const bundle_id = "com.locket.gold"; // Định danh gói Gold của Locket

// Cấu trúc phản hồi giả lập cho RevenueCat
const premium_info = {
  "expires_date": "2099-12-31T23:59:59Z",
  "original_purchase_date": "2023-01-01T00:00:00Z",
  "purchase_date": "2023-01-01T00:00:00Z",
  "ownership_type": "PURCHASED",
  "store": "app_store"
};

// Thực hiện "bơm" dữ liệu Premium vào gói tin trả về
if (obj.subscriber) {
  // 1. Gán quyền truy cập (Entitlements)
  obj.subscriber.entitlements = {
    "gold": premium_info,
    "premium": premium_info
  };
  
  // 2. Gán thông tin đăng ký (Subscriptions)
  obj.subscriber.subscriptions = {
    [bundle_id]: premium_info
  };
  
  // 3. Sửa các thông số nhận diện khác để app tin hoàn toàn
  obj.subscriber.original_application_version = "1.0";
  obj.subscriber.first_seen = "2023-01-01T00:00:00Z";
}

// Chuyển đối tượng JSON ngược lại thành chuỗi văn bản để Shadowrocket gửi cho App
$done({ body: JSON.stringify(obj) });