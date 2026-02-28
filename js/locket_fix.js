/**
 * @name Locket Gold & Longer Video Fix
 * @author Thái_Ho_Dev
 * @description Fix triệt để lỗi 5s dựa trên dữ liệu v2/config
 */

let obj = JSON.parse($response.body);

if (obj.data && obj.data.experiments) {
    // 1. Mở khóa tính năng quay video dài và các quyền Premium
    if (obj.data.experiments.feature_gates) {
        let gates = JSON.parse(obj.data.experiments.feature_gates);
        gates.longer_video = "enabled"; // Bật quay video dài
        gates.video = "enabled";
        gates.locket_views = "enabled";
        gates.unlimited_friends = "enabled";
        obj.data.experiments.feature_gates = JSON.stringify(gates);
    }

    // 2. Kích hoạt hiển thị tính năng Premium trong menu
    if (obj.data.experiments.upsell_features) {
        let upsell = JSON.parse(obj.data.experiments.upsell_features);
        upsell.locket_views = true;
        upsell.app_icon_picker = true;
        upsell.remove_ads = true;
        obj.data.experiments.upsell_features = JSON.stringify(upsell);
    }

    // 3. Ép app nhận diện đã mua Gold (Dành cho bản v2)
    obj.data.experiments.purchases_enabled = "true";
    obj.data.experiments.purchases_entitlement = "Gold";
}

$done({ body: JSON.stringify(obj) });