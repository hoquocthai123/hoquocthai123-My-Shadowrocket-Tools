const obj = JSON.parse($response.body);

// Danh sách các ID cần kích hoạt để mở khóa tính năng quay phim dài
const goldInfo = {
  "expires_date": "2099-12-31T23:59:59Z",
  "original_purchase_date": "2022-01-01T00:00:00Z",
  "purchase_date": "2022-01-01T00:00:00Z",
  "ownership_type": "PURCHASED",
  "store": "app_store"
};

if (obj.subscriber) {
  // Fix lỗi 5s bằng cách gán đúng mã định danh gói Gold mới nhất
  obj.subscriber.entitlements = {
    "gold": goldInfo,
    "plus": goldInfo,
    "premium": goldInfo
  };
  
  obj.subscriber.subscriptions = {
    "com.locket.gold.yearly": goldInfo,
    "com.locket.gold.monthly": goldInfo,
    "com.locket.gold": goldInfo
  };
  
  // Quan trọng: Đánh lừa ngày mua để App không nghi ngờ
  obj.subscriber.original_purchase_date = "2022-01-01T00:00:00Z";
  obj.subscriber.original_application_version = "1.0";
}

$done({ body: JSON.stringify(obj) });