def build_insight(trend_result, anomaly_result):
    trend = trend_result.get("trend")
    slope = trend_result.get("slope", trend_result.get("slope_value", 0))
    anomaly_count = anomaly_result.get("count", 0)

    messages = []

    if trend == "increasing":
        messages.append("Sea temperatures show an increasing trend.")
    elif trend == "decreasing":
        messages.append("Sea temperatures appear to be decreasing slightly.")
    else:
        messages.append("Sea temperatures seem mostly stable.")

    if abs(slope) < 0.05:
        messages.append("Changes are small — overall variation is mild.")
    elif slope > 0:
        messages.append("Warming appears noticeable over time.")
    else:
        messages.append("Cooling signals appear in parts of the dataset.")

    if anomaly_count == 0:
        messages.append("No extreme marine heat spikes detected.")
    elif anomaly_count <= 3:
        messages.append("A few heat anomalies detected — worth monitoring.")
    else:
        messages.append("Multiple heat anomalies detected — potential marine heatwaves.")

    return {
        "summary": " ".join(messages),
        "trend": trend,
        "anomalies": anomaly_count
    }