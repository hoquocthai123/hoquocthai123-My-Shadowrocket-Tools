/**
 * @name Locket_Gold_V2_Full_Fix
 * @author Thái_Ho_Dev
 * @description Mở khóa Gold, Hiện Icon và Fix quay phim 60s
 */

let obj = JSON.parse($response.body);

// 1. Xử lý gói tin Config (Để fix lỗi 5 giây)
if ($request.url.includes("/v2/config")) {
    if (obj.data && obj.data.experiments) {
        // Mở khóa các tính năng bị khóa (longer_video, locket_views...)
        let gates = JSON.parse(obj.data.experiments.feature_gates || "{}");
        gates.longer_video = "enabled";
        gates.video = "enabled";
        gates.locket_views = "enabled";
        gates.unlimited_friends = "enabled";
        obj.data.experiments.feature_gates = JSON.stringify(gates);

        // Hiện các nút Premium trong menu
        let upsell = JSON.parse(obj.data.experiments.upsell_features || "{}");
        upsell.locket_views = true;
        upsell.app_icon_picker = true;
        upsell.remove_ads = true;
        obj.data.experiments.upsell_features = JSON.stringify(upsell);
        
        // Kích hoạt trạng thái mua hàng
        obj.data.experiments.purchases_enabled = "true";
        obj.data.experiments.purchases_entitlement = "Gold";
    }
}

// 2. Xử lý gói tin RevenueCat (Để hiện logo Gold và mở khóa Premium)
if ($request.url.includes("api.revenuecat.com")) {
    const premium = {
        "expires_date": "2099-12-31T23:59:59Z",
        "original_purchase_date": "2023-01-01T00:00:00Z",
        "purchase_date": "2023-01-01T00:00:00Z",
        "ownership_type": "PURCHASED",
        "store": "app_store"
    };
    obj.subscriber = obj.subscriber || {};
    obj.subscriber.entitlements = { "gold": premium, "premium": premium };
    obj.subscriber.subscriptions = { "com.locket.gold.yearly": premium };
}

$done({ body: JSON.stringify(obj) });