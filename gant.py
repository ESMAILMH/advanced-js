import pandas as pd
import plotly.express as px
from datetime import datetime

# بيانات المشروع
data = {
    "Task": [
        "1. جمع وتوثيق المتطلبات",
        "2. تحليل النظام",
        "3. تصميم النظام والواجهات",
        "4. تنفيذ النظام (البرمجة)",
        "5. اختبار النظام",
        "6. التحسين والتعديلات النهائية",
        "7. إعداد الوثائق والتوصيات"
    ],
    "Start": [
        "2024-08-01", "2024-08-21", "2024-09-19",
        "2024-10-18", "2025-01-11", "2025-01-30", "2025-02-19"
    ],
    "Finish": [
        "2024-08-20", "2024-09-16", "2024-10-17",
        "2025-01-10", "2025-01-29", "2025-02-18", "2025-03-15"
    ]
}

# إنشاء DataFrame
df = pd.DataFrame(data)
df["Start"] = pd.to_datetime(df["Start"])
df["Finish"] = pd.to_datetime(df["Finish"])

# إنشاء مخطط جانت
fig = px.timeline(
    df,
    x_start="Start",
    x_end="Finish",
    y="Task",
    color="Task",
    title="مخطط جانت الزمني للمشروع"
)

# تنسيق العرض: من اليسار لليمين، والمهام من الأعلى
fig.update_layout(
    yaxis=dict(autorange=True),
    xaxis=dict(
        tickformat="%Y-%m-%d",
        showgrid=True,
        gridcolor='LightGray',
        side="top"
    ),
    font=dict(family="Arial", size=35),  # حجم الخط 20
    xaxis_title="المدة الزمنية",
    yaxis_title="المهام",
    showlegend=False,
    plot_bgcolor="white",
    title_x=0.5
)

# خط اليوم الحالي
today = datetime.today().strftime("%Y-%m-%d")
fig.add_shape(
    type="line",
    x0=today,
    x1=today,
    y0=0,
    y1=1,
    line=dict(color="red", width=2, dash="dash"),
    xref="x",
    yref="paper"
)

# حفظ النتيجة
fig.write_html("gantt_project_font20.html", auto_open=True)
